import { getClient } from '../../utils/binance-api';

export default async function handler(req, res) {
  const client = getClient();
  const accountInfo = await client.get_account();

  const wallet = accountInfo.balances
    .filter(coin => parseFloat(coin.free) > 0 || parseFloat(coin.locked) > 0)
    .map(coin => ({ asset: coin.asset, amount: parseFloat(coin.free) + parseFloat(coin.locked) }));

  res.status(200).json(wallet);
}
