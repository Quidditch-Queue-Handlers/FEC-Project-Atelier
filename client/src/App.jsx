import React, { useState, useEffect } from 'react';
import ProductDetails from './components/ProductDetails';
import RelatedItems from './components/RelatedItems';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import RatingsAndReviews from './components/RatingsAndReviews';
import NavBar from './components/NavBar';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './state/products/productsSlice';
import { fetchProductInfo } from './state/products/productInfoSlice';
import { fetchProductStyles } from './state/products/productStylesSlice';
import { fetchReviewsMeta } from './state/reviews/reviewsMetaSlice';
import './global.css';


const App = () => {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.data);  
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //setFirstProductId
  useEffect(() => {
    if(!productId && products?.length > 0 && products[0]?.id) {
      setProductId(products[0].id); 
    }
  }, [products, productId]);

  //dispatch product apis
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductInfo(productId));
      dispatch(fetchProductStyles(productId));
      dispatch(fetchReviewsMeta(productId));
    }
  }, [productId])
  


  return (
      <div>
        <NavBar />
        {productId && (
          <>
            <ProductDetails productId={productId} />
            <RelatedItems productId={productId} setProductId={setProductId} />
            <QuestionsAndAnswers product_id={productId} />
            <RatingsAndReviews productId={productId} />
          </>
        )}
      </div>
  );
};

export default App;
