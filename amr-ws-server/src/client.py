'''
Just a client simulator
'''

import asyncio
import websockets

async def hello():
    uri = "ws://localhost:8765"
    print('Connecting to websocket')
    async with websockets.connect(uri) as websocket:
        print('Connected to websocket')
        async for message in websocket:
            print(f" < {message}")

if __name__ == '__main__':
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(hello())

    try:
        event_loop.run_forever()
    finally:
        event_loop.close()