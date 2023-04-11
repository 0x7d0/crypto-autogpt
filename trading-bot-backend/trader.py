import ccxt
import time
import redis

# Replace with your own API keys
BINANCE_API_KEY = 'YOUR_BINANCE_API_KEY'
BINANCE_SECRET_KEY = 'YOUR_BINANCE_SECRET_KEY'
COINBASE_API_KEY = 'YOUR_COINBASE_API_KEY'
COINBASE_SECRET_KEY = 'YOUR_COINBASE_SECRET_KEY'

# Initialize exchange instances
binance = ccxt.binance({
    'apiKey': BINANCE_API_KEY,
    'secret': BINANCE_SECRET_KEY,
    'enableRateLimit': True,
})
coinbasepro = ccxt.coinbasepro({
    'apiKey': COINBASE_API_KEY,
    'secret': COINBASE_SECRET_KEY,
    'enableRateLimit': True,
})

# Initialize Redis client
r = redis.Redis(host='localhost', port=6379, db=0)

trading_pairs = ['BTC/USDT', 'ETH/USDT', 'LTC/USDT']  # Add more trading pairs as needed

arbitrage_margin = 0.01  # Adjust this value based on the profit margin you want to achieve
check_frequency = 5  # Time in seconds between checking for arbitrage opportunities

def check_balance_requirements(trading_pair, amount):
    balance = binance.fetch_balance()
    coin = trading_pair.split('/')[0]
    if balance[coin]['free'] >= amount:
        return True
    return False

def execute_arbitrage(trading_pair, amount):
    # Execute buy order on Coinbase Pro
    coinbase_order = coinbasepro.create_market_buy_order(trading_pair, amount)

    # Execute sell order on Binance
    binance_order = binance.create_market_sell_order(trading_pair, amount)

    return coinbase_order, binance_order

while True:
    for trading_pair in trading_pairs:
        binance_price = float(r.get(f"binance:{trading_pair}"))
        coinbase_price = float(r.get(f"coinbasepro:{trading_pair}"))

        if coinbase_price * (1 + arbitrage_margin) < binance_price:
            print(f"Arbitrage opportunity detected for {trading_pair}!")

            # Calculate the amount to trade based on the balance and exchange limits
            amount = ...  # Define the amount to trade based on your strategy

            # Check if balance requirements are met
            if check_balance_requirements(trading_pair, amount):
                coinbase_order, binance_order = execute_arbitrage(trading_pair, amount)
                print(f"Executed arbitrage: {trading_pair} - Buy on Coinbase Pro: {coinbase_order}, Sell on Binance: {binance_order}")
            else:
                print(f"Insufficient balance to execute arbitrage for {trading_pair}")

    time.sleep(check_frequency)