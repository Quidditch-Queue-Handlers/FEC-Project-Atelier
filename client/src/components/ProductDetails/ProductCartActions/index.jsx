import React from 'react';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

const ProductCartActions = () => {
  return (
    <div>
      <QuantitySelector />
      <SizeSelector/>
      <button>add to bag</button>
      <button>favorite</button>
    </div>
  );
}

export default ProductCartActions;
