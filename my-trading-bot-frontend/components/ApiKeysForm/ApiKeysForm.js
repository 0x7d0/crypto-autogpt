export default function ApiKeysForm({ binanceApiKey, setBinanceApiKey, binanceSecretKey, setBinanceSecretKey, coinMarketCapApiKey, setCoinMarketCapApiKey, onSubmit }) {
    return (
      <div className="max-w-lg mx-auto my-4">
        <h2 className="text-2xl font-medium mb-4">API Keys:</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="binanceApiKey" className="block font-medium mb-1">Binance API Key:</label>
            <input type="text" value={binanceApiKey} onChange={(event) => setBinanceApiKey(event.target.value)} className="border rounded px-2 py-1 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="binanceSecretKey" className="block font-medium mb-1">Binance Secret Key:</label>
            <input type="text" value={binanceSecretKey} onChange={(event) => setBinanceSecretKey(event.target.value)} className="border rounded px-2 py-1 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="coinMarketCapApiKey" className="block font-medium mb-1">CoinMarketCap API Key:</label>
            <input type="text" value={coinMarketCapApiKey} onChange={(event) => setCoinMarketCapApiKey(event.target.value)} className="border rounded px-2 py-1 w-full" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Save Keys</button>
        </form>
      </div>
    )
  }
  