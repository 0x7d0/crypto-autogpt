import os
import time
import requests
import json
from textblob import TextBlob
import tweepy
import redis
from binance import Client, ThreadedWebsocketManager
from binance.exceptions import BinanceAPIException

# Replace these with your API keys
COINMARKETCAP_API_KEY = "your_coinmarketcap_api_key"
BINANCE_API_KEY = "your_binance_api_key"
BINANCE_SECRET_KEY = "your_binance_secret_key"

TWITTER_API_KEY = "your_twitter_api_key"
TWITTER_SECRET_KEY = "your_twitter_secret_key"
TWITTER_ACCESS_TOKEN = "your_twitter_access_token"
TWITTER_ACCESS_TOKEN_SECRET = "your_twitter_access_token_secret"

# Constants
INITIAL_USDT = 150
TARGET_DAILY_PROFIT = 0.1
INTERVAL = 60  # Check the market every 60 seconds

# Initialize the Binance client
client = Client(BINANCE_API_KEY, BINANCE_SECRET_KEY)

# Set up Tweepy
auth = tweepy.OAuthHandler(TWITTER_API_KEY, TWITTER_SECRET_KEY)
auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET)
twitter_api = tweepy.API(auth)

# Set up Redis
REDIS_HOST = 'your_redis_host'
REDIS_PORT = 6379
REDIS_DB = 0
redis_client = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)

def get_market_data():
    url = f"https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    headers = {
        "Accepts": "application/json",
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
    }
    response = requests.get(url, headers=headers)
    return response.json()["data"]

def get_twitter_sentiment(symbol, query, tweet_count=50):
    tweets = tweepy.Cursor(twitter_api.search, q=query, lang="en", result_type="recent").items(tweet_count)
    sentiment_sum = 0
    for tweet in tweets:
        analysis = TextBlob(tweet.text)
        sentiment_sum += analysis.sentiment.polarity

    sentiment_avg = sentiment_sum / tweet_count
    return sentiment_avg

def analyze_market_data(market_data):
    analysis_results = []

    for coin in market_data:
        symbol = coin["symbol"]
        query = f"#{symbol}"
        
        sentiment = get_twitter_sentiment(symbol, query)
        price_change_24h = coin["quote"]["USD"]["percent_change_24h"]
        
        # Store data in Redis
        redis_key = f"{symbol}_analysis"
        redis_value = json.dumps({"symbol": symbol, "sentiment": sentiment, "price_change_24h": price_change_24h})
        redis_client.set(redis_key, redis_value)

        analysis_results.append((symbol, sentiment, price_change_24h))

    return analysis_results

def trade(symbol, side, amount):
    try:
        if side == "buy":
            order = client.create_order(
                symbol=symbol,
                side=Client.SIDE_BUY,
                type=Client.ORDER_TYPE_MARKET,
                quoteOrderQty=amount
            )
        elif side == "sell":
            order = client.create_order(
                symbol=symbol,
                side=Client.SIDE_SELL,
                type=Client.ORDER_TYPE_MARKET,
                quantity=amount
            )
        return order
    except BinanceAPIException as e:
        print(f"Error executing trade for {symbol}: {e.message}")
        return None

def main():
    while True:
        market_data = get_market_data()
        analysis_results = analyze_market_data(market_data)

        for symbol, sentiment, price_change_24h in analysis_results:
            if sentiment > 0 and price_change_24h > 0:
                trade_amount = INITIAL_USDT * TARGET_DAILY_PROFIT
                trade_result = trade(symbol, "buy", trade_amount)
                if trade_result:
                    print(f"Successfully bought {symbol}")

            elif sentiment < 0 and price_change_24h < 0:
                # Replace SYMBOL with the correct symbol format (e.g., 'BTCUSDT' for Bitcoin)
                symbol_format = f"{symbol}USDT"
                balance = client.get_asset_balance(asset=symbol)
                trade_result = trade(symbol_format, "sell", balance["free"])
                if trade_result:
                    print(f"Successfully sold {symbol}")

        time.sleep(INTERVAL)

if __name__ == "__main__":
    main()
