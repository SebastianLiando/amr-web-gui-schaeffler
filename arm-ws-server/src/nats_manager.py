class NatsManager:
    def __init__(self, client):
        self.client = client

        # List of subscription ids
        self.subscriptions_ids = []

    async def connect(self, address: str, loop):
        # Connect
        await self.client.connect(address, loop=loop)
        print('Connected to NATS server')

    async def subscribe(self, topic, handler):
        # Subscribe
        sid = await self.client.subscribe(topic, cb=handler)
        self.subscriptions_ids.append(sid)
        print(f'Subscribed to {topic}')

    async def publish(self, topic: str, payload: bytes):
        await self.client.publish(topic, payload)
        print(f'Published to {topic}')

    async def close(self):
        for sid in self.subscriptions_ids:
            await self.client.unsubscribe(sid)

        print('Unsubscribed from all topics')
        
        await self.client.close()

        print('Closed NATS client')

