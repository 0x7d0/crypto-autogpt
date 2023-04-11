import { getClient } from '../../utils/binance-api';

export default async function handler(req, res) {
  const client = getClient();
  const symbols = ['BTCUSDT', 'ETHUSDT']; // Add your desired trading symbols here

  const allOrders = [];

  for (const symbol of symbols) {
    const orders = await client.get_all_orders({ symbol: symbol, limit: 10 });
    allOrders.push(...orders);
  }

  const orders = allOrders
    .sort((a, b) => b.updateTime - a.updateTime)
    .slice(0, 10)
    .map(order => ({
      orderId: order.orderId,
      symbol: order.symbol,
      side: order.side,
      quantity: parseFloat(order.origQty),
      // Add your calculation for profit/loss here:
      profitLoss: 'N/A'
    }));

  res.status(200).json(orders);
}
