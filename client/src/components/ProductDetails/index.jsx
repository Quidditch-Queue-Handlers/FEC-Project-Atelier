import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGallery from './ProductGallery';
import ProductStyleSelector from './ProductStyleSelector';
import ProductCartActions from './ProductCartActions';

const ProductDetails = ({ productId }) => {

  const [productInfo, setProductInfo] = useState();
  const [productStyles, setProductStyles] = useState();

  useEffect(() => {
    if (productId) {
      axios.get(`/products/${productId}`)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error('product info err?', err));
      axios.get(`/products/${productId}/styles`)
        .then((res) => setProductStyles(res.data))
        .catch((err) => console.error('product styles err?', err));
    }
  }, [productId]);

  return (
    <div>
      <div className='pd-flex'>
        <div className='pd-gallery-container'>
          <ProductGallery />
        </div>
        <div className='pd-flex-col pd-aside-container'>
          <div>
            reviews
          </div>
          <h3>Product Category</h3>
          <h1>Product Name</h1>
          <div>price</div>
          <ProductStyleSelector />
          <ProductCartActions />
        </div>
      </div>
      <div>
        Product Details & Info
      </div>
    </div>
  );
}

export default ProductDetails;
