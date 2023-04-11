import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import ApiKeysForm from '../components/ApiKeysForm'
import TradesList from '../components/TradesList'
import TradingPairsForm from '../components/TradingPairsForm'
import WalletTrend from '../components/WalletTrend'

export default function Home() {
  const [binanceApiKey, setBinanceApiKey] = useState('')
  const [binanceSecretKey, setBinanceSecretKey] = useState('')
  const [coinMarketCapApiKey, setCoinMarketCapApiKey] = useState('')
  const [tradingPairs, setTradingPairs] = useState(['BTC/USDT', 'ETH/USDT', 'LTC/USDT'])
  const [newTradingPair, setNewTradingPair] = useState('')
  const [trades, setTrades] = useState([
    { id: 1, type: 'buy', pair: 'BTC/USDT', amount: 1, price: 50000, profit: 100 },
    { id: 2, type: 'sell', pair: 'ETH/USDT', amount: 2, price: 2000, profit: -50 },
    { id: 3, type: 'buy', pair: 'LTC/USDT', amount: 5, price: 300, profit: 20 },
  ])
  const [walletData, setWalletData] = useState([
    { timestamp: '2022-01-01', totalValue: 1000 },
    { timestamp: '2022-01-02', totalValue: 1200 },
    { timestamp: '2022-01-03', totalValue: 1100 },
    { timestamp: '2022-01-04', totalValue: 1300 },
    { timestamp: '2022-01-05', totalValue: 1500 },
    { timestamp: '2022-01-06', totalValue: 1700 },
    { timestamp: '2022-01-07', totalValue: 1600 },
  ])

  const handleApiKeysSubmit = (event) => {
    event.preventDefault()
    // Send API keys to server for validation and storage
  }

  const handleTradingPairsSubmit = (event) => {
    event.preventDefault()
    setTradingPairs([...tradingPairs, newTradingPair])
    setNewTradingPair('')
  }

  const handleRemoveTradingPair = (tradingPair) => {
    setTradingPairs(tradingPairs.filter(pair => pair !== tradingPair))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ApiKeysForm
        binanceApiKey={binanceApiKey}
        setBinanceApiKey={setBinanceApiKey}
        binanceSecretKey={binanceSecretKey}
        setBinanceSecretKey={setBinanceSecretKey}
        coinMarketCapApiKey={coinMarketCapApiKey}
        setCoinMarketCapApiKey={setCoinMarketCapApiKey}
        onSubmit={handleApiKeysSubmit}
      />
      <TradingPairsForm
        tradingPairs={tradingPairs}
        setTradingPairs={setTradingPairs}
        newTradingPair={newTradingPair}
        setNewTradingPair={setNewTradingPair}
        onSubmit={handleTradingPairsSubmit}
        onRemoveTradingPair={handleRemoveTradingPair}
      />
      <TradesList trades={trades} />
      <WalletTrend data={walletData} />
    </div>
  )
>>>>>>> 3bef869 (adding some features he he)
}
