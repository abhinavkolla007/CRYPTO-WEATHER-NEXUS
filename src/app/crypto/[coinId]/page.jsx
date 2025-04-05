import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const coinId = typeof params?.coinId === "string" ? params.coinId : "crypto";
    return {
      title: `${coinId.toUpperCase()} | Crypto Detail`,
      description: `Live price, market cap, and supply details for ${coinId}.`,
    };
  }
export default async function CryptoDetailPage({ params }) {
  if (!params || !params.coinId) return notFound();

  const coinId = decodeURIComponent(params.coinId).toLowerCase(); // Ensure proper URL decoding

  try {
    const res = await fetch(`https://api.coincap.io/v2/assets/${coinId}`, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Crypto API returned ${res.status}: ${res.statusText}`);
      return notFound();
    }

    const { data } = await res.json();

    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold">{data.name} ({data.symbol})</h1>
        <p className="text-green-400 text-xl mt-2">💰 ${parseFloat(data.priceUsd).toFixed(2)}</p>
        <p className="text-gray-400 mt-4">Market Cap: ${parseFloat(data.marketCapUsd).toLocaleString()}</p>
        <p className="text-gray-400">Supply: {parseFloat(data.supply).toLocaleString()}</p>

        <a href="/" className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white">
          ⬅️ Back to Dashboard
        </a>
      </div>
    );
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
    return notFound();
  }
}
