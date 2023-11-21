import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGallery from './ProductGallery';
import ProductStyleSelector from './ProductStyleSelector';
import ProductCartActions from './ProductCartActions';
import ProductInfo from './ProductInfo';

const ProductDetails = ({ productId }) => {

  const [productInfo, setProductInfo] = useState();
  const [productStyles, setProductStyles] = useState();
  const [selectedStyle, setSelectedStyle] = useState();

  useEffect(() => {
    if (productId) {
      axios.get(`/products/${productId}`)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error('product info err?', err));
      axios.get(`/products/${productId}/styles`)
        .then((res) =>  {
          setProductStyles(res.data)
          setSelectedStyle(res.data?.results?.find(style => style?.['default?'] === true));
        }
        )
        .catch((err) => console.error('product styles err?', err));
    }
  }, [productId]);

  return (
    <div>
      <div className='pd-flex pd-main-container'>
        <div className='pd-wide-container'>
          <ProductGallery styleInfo={selectedStyle} />
        </div>
        <div className='pd-flex-col pd-aside-container'>
          <div>
            reviews
          </div>
          <h2>{productInfo?.category}</h2>
          <h1>{productInfo?.name}</h1>
          <h2>${selectedStyle?.original_price}</h2>
          <ProductStyleSelector selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} productStyles={productStyles} />
          <ProductCartActions />
        </div>
      </div>
      <ProductInfo info={productInfo} />
    </div>
  );
}

export default ProductDetails;
