import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptoNews } from "../utils/fetchNews";

export const getNews = createAsyncThunk("news/getNews", async () => {
    return await fetchCryptoNews();
});

const newsSlice = createSlice({
    name: "news",
    initialState: { articles: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(getNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default newsSlice.reducer;
