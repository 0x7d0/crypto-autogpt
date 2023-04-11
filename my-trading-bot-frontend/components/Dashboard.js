// components/Dashboard.js

import { useState, useEffect } from 'react';

function Dashboard() {
  const [wallet, setWallet] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const responseWallet = await fetch('/api/wallet');
      const walletData = await responseWallet.json();
      setWallet(walletData);

      const responseOrders = await fetch('/api/orders');
      const ordersData = await responseOrders.json();
      setOrders(ordersData);
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-200">Asset</th>
            <th className="border-b-2 border-gray-200">Amount</th>
          </tr>
        </thead>
        <tbody>
          {wallet.map((coin, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200">{coin.asset}</td>
              <td className="border-b border-gray-200">{coin.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-2xl font-bold my-4">Past 10 Orders</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-200">Order ID</th>
            <th className="border-b-2 border-gray-200">Symbol</th>
            <th className="border-b-2 border-gray-200">Side</th>
            <th className="border-b-2 border-gray-200">Quantity</th>
            <th className="border-b-2 border-gray-200">Profit / Loss</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200">{order.orderId}</td>
              <td className="border-b border-gray-200">{order.symbol}</td>
              <td className="border-b border-gray-200">{order.side}</td>
              <td className="border-b border-gray-200">{order.quantity}</td>
              <td className="border-b border-gray-200">{order.profitLoss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
