"use client";

import WeatherCard from "@/components/WeatherCard";
import CryptoCard from "@/components/CryptoCard";
import NewsCard from "@/components/NewsCard";
import FavoritesSection from "../components/FavoritesSection";

export default function HomePage() {
  const cities = ["New York", "London", "Tokyo", "Sydney", "Paris"];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">
        🌍 Crypto Weather Nexus
      </h1>
      <FavoritesSection />

      {/* Weather Section */}
      {/* Weather Section */}
<section className="mb-12">
  <div className="flex justify-center mb-6">
    <h2 className="text-2xl font-semibold text-gray-800 mt-9">🌤️ Weather Forecast</h2>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {cities.map((city) => (
      <WeatherCard key={city} city={city} />
    ))}
  </div>
</section>



      {/* Crypto & News Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Crypto Prices (Left Side) */}
  <div className="bg-white p-6 rounded-lg shadow border border-gray-300 w-full">
    <CryptoCard />
  </div>

  {/* Crypto News (Right Side) */}
  <div className="bg-white p-6 rounded-lg shadow border border-gray-300 w-full">
    <NewsCard />
  </div>
</section>

    </div>
  );
}
