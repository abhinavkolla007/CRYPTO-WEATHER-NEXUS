import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("favorites")) || { cities: [], cryptos: [] };
  }
  return { cities: [], cryptos: [] };
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavorites(),
  reducers: {
    toggleCityFavorite: (state, action) => {
      const city = action.payload;
      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((c) => c !== city);
      } else {
        state.cities.push(city);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
    toggleCryptoFavorite: (state, action) => {
      const crypto = action.payload;
      if (state.cryptos.includes(crypto)) {
        state.cryptos = state.cryptos.filter((c) => c !== crypto);
      } else {
        state.cryptos.push(crypto);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
  },
});

export const { toggleCityFavorite, toggleCryptoFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
