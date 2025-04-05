import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptoPrices } from "@/utils/fetchCrypto";
export const getCrypto = createAsyncThunk("crypto/getCrypto", async () => {
  return await fetchCryptoPrices();
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: { data: null, status: "idle" },
  reducers: {
    updateCryptoRealtime: (state, action) => {
      const { coin, price } = action.payload;
      if (state.data && state.data[coin]) {
        state.data[coin].usd = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCrypto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCrypto.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getCrypto.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateCryptoRealtime } = cryptoSlice.actions;
export default cryptoSlice.reducer;
