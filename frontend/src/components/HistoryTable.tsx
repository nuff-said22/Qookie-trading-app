"use client";

import { useEffect, useState } from "react";
import api from '@/utils/axiosInstance'; // Updated import

export default function HistoryTable({ type }: { type: "deposits" | "trades" }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = type === "deposits" ? "/user/deposits" : "/trade/trades";
        const res = await api.get(url); // Use api
        setData(res.data);
      } catch (err) {
        // Error handled by interceptor
      }
    };
    fetchData();
  }, [type]);

  return (
    <div className="mt-4">
      <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <table className="w-full">
        <tbody>
          {data.map((item: any, i) => (
            <tr key={i}>
              <td>{item.asset || item.coin}</td>
              <td>{item.amount}</td>
              <td>{item.type || "deposit"}</td>
              <td>{item.price || "-"}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}