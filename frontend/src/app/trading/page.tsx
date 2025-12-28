"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import CoinList from "@/components/CoinList";
import OrderForm from "@/components/OrderForm";
import MockOrderBook from "@/components/MockOrderBook";
import Sidebar from "@/components/Sidebar";
import api from '@/utils/axiosInstance';
import { jwtDecode } from "jwt-decode";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const socket = io("http://localhost:5000");

export default function Trading() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [period, setPeriod] = useState("day"); // day, month, year
  const [chartData, setChartData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");
    try {
      jwtDecode(token);
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/");
      return;
    }

    const fetchCoins = async () => {
      try {
        const res = await api.get("/trade/coins");
        setCoins(res.data);
      } catch (err) {}
    };
    fetchCoins();

    socket.on("priceUpdate", setCoins);

    return () => socket.off("priceUpdate");
  }, [router]);

  useEffect(() => {
    if (selectedCoin) {
      const lengths = { day: 24, month: 30, year: 365 }; // Hours/days
      const dataPoints = Array.from({length: lengths[period]}, () => Math.random() * 100 + 50 * Math.random()); // Different per period
      setChartData({
        labels: Array.from({length: lengths[period]}, (_, i) => i + 1),
        datasets: [{
          label: `${selectedCoin.symbol} Price (${period})`,
          data: dataPoints,
          borderColor: Math.random() > 0.5 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)', // Random color scheme
          tension: 0.3 + Math.random() * 0.2, // Different look
        }],
      });
    }
  }, [selectedCoin, period]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full bg-gray-900">
        <h2 className="text-3xl mb-6 font-bold">Trading Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded shadow overflow-y-auto max-h-[500px]">
            <CoinList coins={coins} onSelectCoin={setSelectedCoin} /> {/* Pass onSelect */}
          </div>
          <div>
            {selectedCoin && (
              <div className="mb-4 flex gap-2">
                <button onClick={() => setPeriod("day")} className={`p-2 rounded ${period === "day" ? "bg-blue-600" : "bg-gray-600"}`}>Day</button>
                <button onClick={() => setPeriod("month")} className={`p-2 rounded ${period === "month" ? "bg-blue-600" : "bg-gray-600"}`}>Month</button>
                <button onClick={() => setPeriod("year")} className={`p-2 rounded ${period === "year" ? "bg-blue-600" : "bg-gray-600"}`}>Year</button>
              </div>
            )}
            <div className="bg-gray-800 p-4 rounded shadow mb-4">
              {chartData ? <Line data={chartData} options={{ responsive: true }} /> : <p>Select a coin to view chart</p>}
            </div>
            <div className="bg-gray-800 p-4 rounded shadow mb-4">
              <OrderForm />
            </div>
            <div className="bg-gray-800 p-4 rounded shadow">
              <MockOrderBook />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}