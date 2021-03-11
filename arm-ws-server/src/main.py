import asyncio
import websockets
import json
from nats.aio.client import Client as NatsClient
from nats.aio.errors import ErrConnectionClosed, ErrTimeout, ErrNoServers

from nats_manager import NatsManager
import const

async def nats_message_handler(message):
    subject = message.subject
    reply = message.reply
    data = json.loads(message.data.decode())

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


if __name__ == '__main__':
    loop = asyncio.get_event_loop()

    # Spin Up Nats
    nats_client = NatsClient()
    nats_manager = NatsManager(nats_client)

    loop.run_until_complete(nats_manager.connect(const.NATS_SERVER_ADDRESS, loop)) # Connect
    loop.run_until_complete(nats_manager.subscribe('Random_1', nats_message_handler)) # Subscribe topics
    loop.run_until_complete(nats_manager.subscribe('Random_2', nats_message_handler))

    loop.run_until_complete(nats_manager.publish('Random_1', json.dumps({ 'x': 12, 'y': 13, 'z': 13 }).encode()))
    # loop.run_until_complete(nats_manager.publish('Random_2', b'Hello from random 2'))
    # loop.run_until_complete(nats_manager.publish('Random_3', b'Hello from random 3 (Should not be received)'))

    # loop.run_until_complete(run_websocket())

    try:
        loop.run_forever()
    except Exception:
        pass
    finally:
        loop.run_until_complete(nats_manager.close())
        loop.close()
        print('Loop closed!')
