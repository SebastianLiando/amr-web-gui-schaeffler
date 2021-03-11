'''
Just a client simulator
'''

import asyncio
import websockets

async def hello():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        name = "Bob, the client"
        await websocket.send(name)

        response = await websocket.recv()
        print(f" < {response}")

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(hello())