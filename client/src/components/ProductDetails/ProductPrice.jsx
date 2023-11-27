import React from 'react';

const ProductPrice = ({ selectedStyle }) => {
  if (selectedStyle?.sale_price) {
    return (
      <h2>
        <span className='pd-sale-price'>${selectedStyle?.sale_price}</span>
        <span style={{ textDecoration: 'line-through', marginLeft: '0.5rem'}}>${selectedStyle?.original_price}</span>
      </h2>
    );
  }

  return <h2>${selectedStyle?.original_price}</h2>;
};

export default ProductPrice;
