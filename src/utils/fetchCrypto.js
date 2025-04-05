// utils/fetchCryptoPrices.js

export const fetchCryptoPrices = async () => {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,dogecoin");
    const data = await response.json();

    const prices = {};
    data.data.forEach((coin) => {
      prices[coin.id] = {
        usd: parseFloat(coin.priceUsd),
        symbol: coin.symbol,
      };
    });

    return prices;
  } catch (error) {
    console.error("Failed to fetch crypto prices:", error);
    return null;
  }
};
