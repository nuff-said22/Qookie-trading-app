"use client";

import { useEffect, useState } from "react";
import api from '@/utils/axiosInstance'; // Updated import

interface Balance {
  asset: string;
  amount: number;
}

interface PortfolioItem {
  coin: string;
  amount: number;
}

export default function BalanceDisplay({ refreshKey = 0 }: { refreshKey?: number }) {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balRes = await api.get("/user/balances"); // Use api
        const portRes = await api.get("/user/portfolio"); // Use api
        setBalances(balRes.data);
        setPortfolio(portRes.data);
      } catch (err) {
        // Error handled by interceptor
      }
    };
    fetchData();
  }, [refreshKey]);

  return (
    <div>
      <h3>Balances</h3>
      <ul>
        {balances.map(b => <li key={b.asset}>{b.asset}: {b.amount}</li>)}
      </ul>
      <h3>Portfolio</h3>
      <ul>
        {portfolio.map(p => <li key={p.coin}>{p.coin}: {p.amount}</li>)}
      </ul>
    </div>
  );
}