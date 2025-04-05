"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCrypto } from "@/store/cryptoSlice";
import { toggleCryptoFavorite } from "@/store/favoritesSlice";
import Link from "next/link";

export default function CryptoCard() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.crypto);
  const favorites = useSelector((state) => state.favorites.cryptos);

  useEffect(() => {
    dispatch(getCrypto());
  }, [dispatch]);

  const refreshCryptoPrices = () => {
    dispatch(getCrypto());
  };

  if (status === "loading")
    return <p className="text-gray-400 text-center text-sm">⏳ Loading Crypto Data...</p>;

  if (status === "failed")
    return <p className="text-red-500 text-center text-sm">⚠️ Failed to load crypto data.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Live Crypto Prices</h2>
      <ul className="space-y-2">
        {data &&
          Object.entries(data).map(([name, values]) => {
            const isFavorite = favorites.includes(name);

            return (
              <li
                key={name}
                className="flex justify-between items-center px-4 py-2 bg-blue-100 rounded-lg"
              >
                {/* Crypto Name & Link */}
                <Link href={`/crypto/${name}`}>
                  <span className="capitalize font-semibold text-blue-900 hover:underline cursor-pointer">
                    {name}
                  </span>
                </Link>

                {/* Price & Favorite Button */}
                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-bold">
                    ${parseFloat(values.usd).toFixed(2)}
                  </span>

                  {/* Favorite Button */}
                  <button
                    onClick={() => dispatch(toggleCryptoFavorite(name))}
                    className={`px-2 py-1 rounded-md ${
                      isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isFavorite ? "❤️" : "🤍"}
                  </button>
                </div>
              </li>
            );
          })}
      </ul>

      {/* Refresh Button */}
      <button
        onClick={refreshCryptoPrices}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
      >
        🔄 Refresh
      </button>
    </div>
  );
}
