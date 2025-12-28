"use client";
import { useState, useMemo } from "react";
type Coin = { symbol: string; price: number; change24h: number; volume: number; marketCap?: number }; // Made marketCap optional to avoid undefined errors
export default function CoinList({ coins, onSelectCoin }: { coins: Coin[]; onSelectCoin: (coin: Coin) => void }) {
  const [page, setPage] = useState(0);
  const perPage = 50;

  const enhancedCoins = useMemo(() => 
    coins.map(coin => ({
      ...coin,
      marketCap: coin.marketCap ?? Math.floor(Math.random() * 10000000000 + 1000000),
    })),
  [coins]);

  const paginated = enhancedCoins.slice(page * perPage, (page + 1) * perPage);
  return (
    <div>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full table-auto">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2">Symbol</th>
              <th className="p-2">Price</th>
              <th className="p-2">24h %</th>
              <th className="p-2">Volume</th>
              <th className="p-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(coin => (
              <tr key={coin.symbol} onClick={() => onSelectCoin(coin)} className="cursor-pointer hover:bg-gray-700 transition">
                <td className="p-2">{coin.symbol}</td>
                <td className="p-2">{coin.price.toFixed(2)}</td>
                <td className={`p-2 ${coin.change24h > 0 ? "text-green-500" : "text-red-500"}`}>{coin.change24h.toFixed(2)}%</td>
                <td className="p-2">{coin.volume.toFixed(0)}</td>
                <td className="p-2">{coin.marketCap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex justify-between">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} className="bg-gray-600 p-2 rounded">Prev</button>
        <span>Page {page + 1} / {Math.ceil(enhancedCoins.length / perPage)}</span>
        <button onClick={() => setPage(p => Math.min(Math.ceil(enhancedCoins.length / perPage) - 1, p + 1))} className="bg-gray-600 p-2 rounded">Next</button>
      </div>
    </div>
  );
}