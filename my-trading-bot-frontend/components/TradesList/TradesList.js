export default function TradesList({ trades }) {
    return (
      <div className="max-w-lg mx-auto my-4">
        <h2 className="text-2xl font-medium mb-4">Recent Trades:</h2>
        <ul className="list-disc ml-4">
          {trades.map(trade => (
            <li key={trade.id} className="border-b py-2">
              <div className="flex justify-between">
                <div>
                  <div className="text-gray-600">{trade.type.toUpperCase()} {trade.amount} {trade.pair}</div>
                  <div className="text-sm text-gray-400">{trade.price} USDT</div>
                </div>
                <div className={trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {trade.profit >= 0 ? '+' : '-'}{Math.abs(trade.profit)} USDT
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  