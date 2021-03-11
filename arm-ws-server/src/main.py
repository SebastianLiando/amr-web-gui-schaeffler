import asyncio
import websockets
from nats.aio.client import Client as NatsClient
from nats.aio.errors import ErrConnectionClosed, ErrTimeout, ErrNoServers


async def random_message_handler(message):
    subject = message.subject
    reply = message.reply
    data = message.data.decode()

    print("Received a message on '{subject} {reply}': {data}".format(
        subject=subject, reply=reply, data=data))


async def websocket_handler(websocket, path):
    name = await websocket.recv()
    print(f"< {name}")

    greeting = f"Hello {name}!"

    await websocket.send(greeting)
    print(f"> {greeting}")


def run_websocket():
    return websockets.serve(websocket_handler, host="localhost", port=8765)


async def run(loop, server_address: str):
    client = NatsClient()

    await client.connect(server_address, loop=loop)
    print(client.connected_url)

    sid = await client.subscribe('Random', cb=random_message_handler)

    await client.publish('Random', b'Hello World!')
    print('Published message')

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run_websocket())
    loop.run_until_complete(run(loop, 'nats://127.0.0.1:4222'))

    try:
        loop.run_forever()
    except RuntimeError:
        pass
    finally:
        loop.close()
        print('Loop closed!')
