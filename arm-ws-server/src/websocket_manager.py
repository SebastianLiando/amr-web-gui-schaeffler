import websockets


class WebSocketManager:
    """
    Manages WebSocket Server.
    """

    def __init__(self, host: str, port: int):
        self.handler = None  # Client handler function
        self.server = None  # The WS server object
        self.host = host
        self.port = port

        self.clients = set()  # Set of clients connected to the server

    def set_handler(self, handler):
        self.handler = handler

    async def start_server(self):
        if self.handler is None:
            raise Exception('Call set_handler() function first before starting server!')

        self.server = await websockets.serve(ws_handler=self.handler, host=self.host, port=self.port)

    async def close(self):
        if not self.server is None:
            self.server.close()
            print('Closed WebSocket server')

    def add_client(self, client_websocket):
        self.clients.add(client_websocket)

    def remove_client(self, client_websocket):
        self.clients.remove(client_websocket)

    def get_client_count(self):
        return len(self.clients)

    async def send_to_clients(self, message):
        for client in self.clients:
            try:
                await client.send(message)
            except websockets.exceptions.ConnectionClosed:
                self.remove_client(client)
                print('Connection closed by client!')
            # except Exception:
            #     print('Failed to send to a client!')
