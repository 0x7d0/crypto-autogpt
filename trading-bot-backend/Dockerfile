# Use an official Python runtime as a parent image
FROM python:3.9.7-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt .

# Install any needed packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variables for the Flask server
ENV FLASK_APP=main.py
ENV FLASK_ENV=production
ENV COINBASE_API_KEY=<your_coinbase_api_key>
ENV COINBASE_SECRET=<your_coinbase_secret_key>
ENV BINANCE_API_KEY=<your_binance_api_key>
ENV BINANCE_SECRET=<your_binance_secret_key>
ENV COINMARKETCAP_API_KEY=<your_coinmarketcap_api_key>
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

# Expose port 3000 for the Flask server
EXPOSE 3000

# Start the Flask server
CMD ["flask", "run", "--host=0.0.0.0", "--port=3000"]
