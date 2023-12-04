import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 

const initialState = {
  data: [], 
  isLoading: false, 
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async () => {
    const res = await axios.get('/products');
    return res.data; 
  }
)

const productsSlice = createSlice({
  name: 'products', 
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    });
  }
}); 

export default productsSlice.reducer; 