export default function WalletTrend({ data }) {
    const total = data.reduce((acc, { amount, price }) => acc + (amount * price), 0)
    const change = (total - 150) / 150 * 100
  
    return (
      <div className="max-w-lg mx-auto my-4">
        <h2 className="text-2xl font-medium mb-4">Wallet Trend:</h2>
        <div className={`text-3xl font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : '-'}{Math.abs(change).toFixed(2)}% ({total.toFixed(2)} USDT)
        </div>
      </div>
    )
  }
  