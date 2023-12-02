import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

const initialState = {
  data: {}, 
  isLoading: false, 
  error: null,
};

export const fetchProductInfo = createAsyncThunk(
  'productInfo/fetchProductInfo', 
  async (productId) => {
    const res = await axios.get(`/products/${productId}`);
    return res.data; 
  }
)

const productInfoSlice = createSlice({
  name: 'productInfo', 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductInfo.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(fetchProductInfo.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = {...state.data, [action.payload.id]: action.payload }
    });
    builder.addCase(fetchProductInfo.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    });
  }
}); 

export default productInfoSlice.reducer; 