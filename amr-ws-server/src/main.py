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
import mss
import base64
import time


async def send_images(ws_manager, fps=30):
    sct = mss.mss()

    previous_time = 0

    while True:
        # Grab bounding box of the interested window
        window = pygetwindow.getWindowsWithTitle('Twitch')[0]
        x1 = window.left
        width = window.width
        y1 = window.top
        height = window.height

        monitor = {
            'top': y1, 
            'left': x1, 
            'width': width, 
            'height': height,
        }
        
        # Take the screenshot
        ss = sct.grab(monitor)

        # Compress the screenshot and prepare it to be sent
        ss_bytes = mss.tools.to_png(ss.rgb, (width, height), level=6)

        payload = {
            'subject': 'rviz',
            'data': str(base64.b64encode(ss_bytes))[2:][:-1],
        }

        # Send to all clients
        try:
            await ws_manager.send_to_clients(json.dumps(payload))
        except RuntimeError:
            # If a client closes the connection while data is being sent
            pass        

        print(f'FPS: {int(1 / (time.time() - previous_time))}')
        previous_time = time.time()
        
        if fps != 0:
            await asyncio.sleep(1 / fps)
        else:
            await asyncio.sleep(0)


import random


async def send_health_state(ws_manager):
    yaw = 0

    while True:
        yaw += 1

        odometry_payload = {
            'subject': 'odometry',
            'data': {
                    'yaw': yaw,
                    'vel_yaw': random.randint(0, 100) * random.random(),
                    'x': random.randint(0, 100),
                    'y': random.randint(0, 100),
                    'vel_x': random.randint(0, 100) * random.random(),
                    'vel_y': random.randint(0, 100) * random.random(),
                    'acc_x': random.randint(0, 100) * random.random(),
                    'acc_y':random.randint(0, 100) * random.random(),
            }
        }

        try:
            await ws_manager.send_to_clients(json.dumps(odometry_payload))
        except RuntimeError:
            pass

        await asyncio.sleep(0.1)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()

    # Spin Up WS Server
    ws_manager = WebSocketManager('localhost', 8765)

    # Message handler
    async def websocket_handler(websocket, _):
        # Register client
        ws_manager.add_client(websocket)
        print(f'Number of clients: {ws_manager.get_client_count()}')

        # Listens to messages from client (prevents the client from being closed)
        async for client_message in websocket:
            print(f'From client: {client_message}')

    ws_manager.set_handler(websocket_handler)
    loop.run_until_complete(ws_manager.start_server())

    # Periodically send screenshots
    # task = loop.create_task(send_images(ws_manager, fps=0))
    # loop.run_until_complete(task)

    # Periodically send health states
    health_task = loop.create_task(send_health_state(ws_manager))
    loop.run_until_complete(health_task)

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
