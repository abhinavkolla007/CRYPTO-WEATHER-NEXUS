"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "@/store/weatherSlice";
import { toggleCityFavorite } from "@/store/favoritesSlice";
import {
  WiCloud,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import Link from "next/link";

const weatherIcons = {
  Clouds: <WiCloud className="text-blue-800 text-5xl" />,
  Clear: <WiDaySunny className="text-yellow-500 text-5xl" />,
  Rain: <WiRain className="text-blue-900 text-5xl" />,
  Snow: <WiSnow className="text-blue-700 text-5xl" />,
  Thunderstorm: <WiThunderstorm className="text-blue-900 text-5xl" />,
};

export default function WeatherCard({ city }) {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather[city]);
  const favorites = useSelector((state) => state.favorites.cities);
  const isFavorite = favorites.includes(city);

  useEffect(() => {
    dispatch(getWeather(city));
  }, [dispatch, city]);

  if (!weatherData)
    return <p className="text-gray-500">Loading weather...</p>;
  if (weatherData.cod !== 200)
    return <p className="text-red-500">Error: {weatherData.message}</p>;

  const {
    name,
    main: { temp, feels_like, humidity },
    weather,
    wind,
  } = weatherData;
  const weatherType = weather[0].main;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm mx-auto mt-6 text-gray-900 text-center border border-gray-300">
      {/* City Name with Link */}
      <Link href={`/weather/${city.toLowerCase()}`}>
        <h2 className="text-2xl font-bold mb-2 hover:underline">{name}</h2>
      </Link>

      {/* Weather Icon */}
      <div className="flex justify-center items-center mb-4">
        {weatherIcons[weatherType] || <WiCloud className="text-blue-800 text-5xl" />}
      </div>

      {/* Weather Details */}
      <p className="text-lg">🌡 Temp: {temp}°C</p>
      <p className="text-lg">🥵 Feels Like: {feels_like}°C</p>
      <p className="text-lg">💧 Humidity: {humidity}%</p>
      <p className="text-lg">💨 Wind: {wind.speed} m/s</p>
      <p className="text-lg">🌤 Condition: {weather[0].description}</p>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        {/* Refresh Button */}
        <button
          onClick={() => dispatch(getWeather(city))}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
        >
          🔄 Refresh
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => dispatch(toggleCityFavorite(city))}
          className={`px-4 py-2 rounded-lg shadow-md ${
            isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
        </button>
      </div>
    </div>
  );
}
