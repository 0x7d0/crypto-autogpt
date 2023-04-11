// utils/binance-api.js

import { Client } from 'binance';

const BINANCE_API_KEY = process.env.BINANCE_API_KEY;
const BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY;

export function getClient() {
  return new Client({
    apiKey: BINANCE_API_KEY,
    apiSecret: BINANCE_SECRET_KEY,
    getTime: () => Date.now(),
  });
}
