import React, { useState } from 'react';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

const ProductCartActions = ( { selectedStyle } ) => {

  const [selectedSku, setSelectedSku] = useState(); 

  return (
    <div>
      <SizeSelector selectedStyle={selectedStyle} selectedSku={selectedSku} setSelectedSku={setSelectedSku} />
      <QuantitySelector />
      <button>add to bag</button>
      <button>favorite</button>
    </div>
  );
}

export default ProductCartActions;
