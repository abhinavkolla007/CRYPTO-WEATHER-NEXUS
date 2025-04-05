import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../utils/api";

export const getWeather = createAsyncThunk("weather/getWeather", async (city) => {
  const data = await fetchWeather(city);
  return { city, data };
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.fulfilled, (state, action) => {
        state[action.payload.city] = action.payload.data;
      });
  },
});
export default weatherSlice.reducer;