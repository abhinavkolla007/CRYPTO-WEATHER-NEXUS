const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "e8b5e276f5ec71df63230411ad44179f";

const BASE_CRYPTO_URL = "https://api.coingecko.com/api/v3/simple/price";

export const fetchWeather = async (city) => {
  try {
    console.log(`Fetching weather for: ${city}`);

    const response = await fetch(`${BASE_WEATHER_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API Error Response:", errorData);
      throw new Error(`Weather data fetch failed: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Weather API Error:", error.message);
    return null;
  }
};

export const fetchCryptoPrices = async (cryptoIds = "bitcoin,ethereum,dogecoin") => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd`
    );

    if (!response.ok) throw new Error("Failed to fetch crypto data");

    return await response.json();
  } catch (error) {
    console.error("Crypto API Error:", error.message);
    return null;
  }
};
