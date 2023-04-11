// pages/index.js

import Head from 'next/head';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Trading Bot Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100">
        <Dashboard />
      </main>
    </div>
  );
}
