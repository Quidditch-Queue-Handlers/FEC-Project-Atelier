import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

const initialState = {
  data: {}, 
  isLoading: false, 
  error: null,
};

export const fetchReviewsMeta = createAsyncThunk(
  'reviewsMeta/fetchReviewsMeta', 
  async (productId) => {
    const res = await axios.get(`/reviews/meta?product_id=${productId}`);
    const ratings = res?.data?.ratings ?? {};
    let count = 0;
    let total = 0;
    Object.entries(ratings).forEach((entry) => {
      count += +(entry?.[1] ?? 0);
      total += +(entry?.[0] ?? 0) * +(entry?.[1] ?? 0);
    });
    const ratingsSummary = {
      count: count, 
      average: total / count
    }
    return {...res.data, ratingsSummary}; 
  }
)

const reviewsMetaSlice = createSlice({
  name: 'reviewsMeta', 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviewsMeta.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(fetchReviewsMeta.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = {...state.data, [action.payload.product_id]: action.payload }
    });
    builder.addCase(fetchReviewsMeta.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    });
  }
}); 

export default reviewsMetaSlice.reducer; 