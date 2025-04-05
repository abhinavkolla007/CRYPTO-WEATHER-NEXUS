import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import cryptoReducer from "./cryptoSlice";
import newsSlice from "./newsSlice"; 
import favoritesSlice from "./favoritesSlice"; 

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsSlice,
    favorites: favoritesSlice,
  },
});

export default store;