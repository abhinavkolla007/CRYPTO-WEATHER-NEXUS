import { useSelector } from "react-redux";

const FavoritesSection = () => {
  const { cities, cryptos } = useSelector((state) => state.favorites);

  return (
    <div className="p-5 bg-white shadow-md rounded-lg border border-gray-300">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        ⭐ Favorites
      </h2>

      {/* Favorite Cities */}
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-700">📍 Cities:</h3>
        {cities.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-1">
            {cities.map((city) => (
              <span
                key={city}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center gap-1"
              >
                🏙️ {city}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-1">No favorite cities yet.</p>
        )}
      </div>

      {/* Favorite Cryptos */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700">💰 Cryptos:</h3>
        {cryptos.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-1">
            {cryptos.map((crypto) => (
              <span
                key={crypto}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full flex items-center gap-1"
              >
                🪙 {crypto}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-1">No favorite cryptos yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesSection;
