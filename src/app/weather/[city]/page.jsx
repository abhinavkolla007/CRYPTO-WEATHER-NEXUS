"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mockWeatherHistory } from "./history"; 

export default function CityWeatherDetail() {
  const { city } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cityKey = decodeURIComponent(city || "").toLowerCase();
    const result = mockWeatherHistory[cityKey];
  
    setTimeout(() => {
      setData(result || null);
      setLoading(false);
    }, 500);
  }, [city]);
  
  

  if (loading) return <p className="text-center mt-4">⏳ Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline">⬅ Go Back</Link>
      <h1 className="text-2xl font-bold mt-4 capitalize">{city} Weather Detail</h1>

      {data && data.length > 0 ? (
  <table className="w-full mt-4 border-collapse border border-gray-300 bg-white text-gray-900 shadow-lg rounded-xl overflow-hidden">
    <thead>
      <tr className="bg-blue-200">
        <th className="p-2 border">Date</th>
        <th className="p-2 border">Temp (°C)</th>
        <th className="p-2 border">Humidity (%)</th>
        <th className="p-2 border">Wind (m/s)</th>
      </tr>
    </thead>
    <tbody>
      {data.map((day, idx) => (
        <tr key={idx} className="text-center border-t">
          <td className="p-2 border">{day.date}</td>
          <td className="p-2 border">{day.temp}</td>
          <td className="p-2 border">{day.humidity}</td>
          <td className="p-2 border">{day.wind}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-red-500 mt-4">⚠️ No data found for this city.</p>
)}

    </div>
  );
}
