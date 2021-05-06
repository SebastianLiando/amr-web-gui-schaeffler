import asyncio
import websockets
import json
import time
from nats.aio.client import Client as NatsClient
from nats.aio.errors import ErrConnectionClosed, ErrTimeout, ErrNoServers

from nats_manager import NatsManager
from websocket_manager import WebSocketManager
import const

# def start_mock_nats_activity():
#      # Mocks the publishing activity
#     async def fake_publish():
#         import random

#         topics = ['Random_1', 'Random_2']
#         fake_data = json.dumps({ 'x': 12, 'y': 13, 'z': 13 }).encode()

#         print('Start publishing...')

#         while True:
#             try:
#                 await nats_manager.publish(topics[random.randint(0, 1)], fake_data)
#                 await asyncio.sleep(1)
#             except Exception:
#                 break

#     asyncio.Task(fake_publish())


import pygetwindow
import pyautogui
from io import BytesIO
from PIL import Image
import base64


async def send_images(ws_manager):
    while True:
        window = pygetwindow.getWindowsWithTitle('screenshot')[0]
        print(window)
        x1 = window.left
        x2 = x1 + 10#window.width
        y1 = window.top
        y2 = y1 + 10#window.height

        ss = pyautogui.screenshot()
        ss = ss.crop((x1, y1, x2, y2))

        with BytesIO() as output:
            ss.save(output, format="PNG")
            contents = output.getvalue()

            payload = {
                'subject': 'rviz',
                'data': str(base64.b64encode(contents)),
            }

            try:
                await ws_manager.send_to_clients(json.dumps(payload))
            except RuntimeError:
                # If a client closes the connection while data is being sent
                pass
                
            print(len(payload['data']))

        await asyncio.sleep(1)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()

    # Spin Up WS Server
    ws_manager = WebSocketManager('localhost', 8765)

    # Message handler
    async def websocket_handler(websocket, path):
        # Register client
        ws_manager.add_client(websocket)
        print(f'Number of clients: {ws_manager.get_client_count()}')

        # Listens to messages from client (prevents the client from being closed)
        async for client_message in websocket:
            print(f'From client: {client_message}')

    ws_manager.set_handler(websocket_handler)
    loop.run_until_complete(ws_manager.start_server())

    # Periodically send screenshots
    task = loop.create_task(send_images(ws_manager))
    loop.run_until_complete(task)

    # Spin Up Nats
    # nats_client = NatsClient()
    # nats_manager = NatsManager(nats_client)

    # async def nats_message_handler(message):
    #     # Get the message
    #     subject = message.subject
    #     data = json.loads(message.data.decode())

    #     print(f"Received a message on '{subject}': {data}")
        
    #     # Construct payload to be sent to WS clients
    #     payload = {
    #         'subject': subject,
    #         'data': data
    #     }

    #     # Broadcast the payload to all clients
    #     await ws_manager.send_to_clients(json.dumps(payload))

    # loop.run_until_complete(nats_manager.connect(const.NATS_SERVER_ADDRESS, loop)) # Connect
    # loop.run_until_complete(nats_manager.subscribe('Random_1', nats_message_handler)) # Subscribe topics
    # loop.run_until_complete(nats_manager.subscribe('Random_2', nats_message_handler))

    # start_mock_nats_activity()

    try:
        print('Looping indefinitely')
        loop.run_forever()
    finally:
        # Close NATS subscriber
        # loop.run_until_complete(nats_manager.close())

        # Close WebSocket Server
        loop.run_until_complete(ws_manager.close())

        # Terminate event loop
        loop.close()
        print('Loop closed!')
