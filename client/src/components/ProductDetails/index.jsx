import React, { useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductStyleSelector from './ProductStyleSelector';
import ProductCartActions from './ProductCartActions';
import ProductInfo from './ProductInfo';

const ProductDetails = () => {

  const [productInfo, setProductInfo] = useState();

  return (
    <div>
      <div className='pd-flex'>
        <div className='pd-wide-container'>
          <ProductGallery />
        </div>
        <div className='pd-flex-col pd-aside-container'>
          <div>
            reviews
          </div>
          <h2>{productInfo?.category}</h2>
          <h1>{productInfo?.name}</h1>
          <div>price</div>
          <ProductStyleSelector />
          <ProductCartActions />
        </div>
      </div>
      <ProductInfo info={productInfo} />
    </div>
  );
}

export default ProductDetails;
