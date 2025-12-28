"use client";

import { useEffect, useState } from "react";
import api from '@/utils/axiosInstance'; // Updated import

export default function BalanceDisplay() {
  const [balances, setBalances] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

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
  }, []);

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