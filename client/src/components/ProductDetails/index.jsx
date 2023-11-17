import React from 'react';
import ProductGallery from './ProductGallery';
import ProductStyleSelector from './ProductStyleSelector';
import ProductCartActions from './ProductCartActions';

const ProductDetails = () => {
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
