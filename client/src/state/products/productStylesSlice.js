import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

const initialState = {
  data: {}, 
  isLoading: false, 
  error: null,
};

export const fetchProductStyles = createAsyncThunk(
  'productStyles/fetchProductStyles', 
  async (productId) => {
    const res = await axios.get(`/products/${productId}/styles`);
    return res.data; 
  }
)

const productStylesSlice = createSlice({
  name: 'productStyles', 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductStyles.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(fetchProductStyles.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = {...state.data, [action.payload.product_id]: action.payload }
    });
    builder.addCase(fetchProductStyles.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    });
  }
}); 

export default productStylesSlice.reducer; 