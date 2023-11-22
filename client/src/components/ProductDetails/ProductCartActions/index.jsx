import React, { useEffect, useState } from 'react';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

const ProductCartActions = ( { selectedStyle } ) => {

  const [selectedSku, setSelectedSku] = useState(); 
  const [selectedQuantity, setSelectedQuantity] = useState(); 

  return (
    <div>
      <SizeSelector 
        selectedStyle={selectedStyle} 
        selectedSku={selectedSku} 
        setSelectedSku={setSelectedSku} 
      />
      <QuantitySelector 
        selectedStyle={selectedStyle} 
        selectedSku={selectedSku} 
        setSelectedSku={setSelectedSku} 
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setSelectedQuantity}
      />
      <button>add to bag</button>
      <button>favorite</button>
    </div>
  );
}

export default ProductCartActions;
