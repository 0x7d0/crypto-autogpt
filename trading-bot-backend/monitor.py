import asyncio
import json
import websockets
import redis

# Initialize Redis client
r = redis.Redis(host='localhost', port=6379, db=0)

trading_pairs = ['btcusdt', 'ethusdt', 'ltcusdt']  # Add more trading pairs as needed (lowercase for Binance)

async def binance_websocket():
    url = "wss://stream.binance.com:9443/ws"
    streams = '/'.join(f"{pair}@ticker" for pair in trading_pairs)

    while True:
        try:
            async with websockets.connect(f"{url}/{streams}") as websocket:
                while True:
                    response = await websocket.recv()
                    data = json.loads(response)

                    symbol = data['s'].upper()
                    binance_price = float(data['a'])

                    r.set(f"binance:{symbol}", binance_price)
                    print(f"{symbol}: Binance: {binance_price}")

        except Exception as e:
            print(f"Error in Binance WebSocket: {e}")
            await asyncio.sleep(5)  # Wait before trying to reconnect

async def coinbase_websocket():
    url = "wss://ws-feed.pro.coinbase.com"
    channels = [{"name": "ticker", "product_ids": [pair.upper() for pair in trading_pairs]}]

    while True:
        try:
            async with websockets.connect(url) as websocket:
                await websocket.send(json.dumps({
                    "type": "subscribe",
                    "channels": channels
                }))

                while True:
                    response = await websocket.recv()
                    data = json.loads(response)

                    if data['type'] == 'ticker':
                        symbol = data['product_id']
                        coinbase_price = float(data['price'])

                        r.set(f"coinbasepro:{symbol}", coinbase_price)
                        print(f"{symbol}: Coinbase Pro: {coinbase_price}")

        except Exception as e:
            print(f"Error in Coinbase Pro WebSocket: {e}")
            await asyncio.sleep(5)  # Wait before trying to reconnect

async def main():
    await asyncio.gather(
        binance_websocket(),
        coinbase_websocket()
    )

if __name__ == "__main__":
    asyncio.run(main())
