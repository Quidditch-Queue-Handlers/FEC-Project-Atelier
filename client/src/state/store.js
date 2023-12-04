import { configureStore } from '@reduxjs/toolkit'; 
import productsReducer from './products/productsSlice'; 
import productInfoSlice from './products/productInfoSlice';
import productStylesSlice from './products/productStylesSlice';
import reviewsMetaSlice from './reviews/reviewsMetaSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    productInfo: productInfoSlice,
    productStyles: productStylesSlice,
    reviewMeta: reviewsMetaSlice
  }
}); 