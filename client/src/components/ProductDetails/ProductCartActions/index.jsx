import React, { useEffect, useState } from 'react';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

const ProductCartActions = ({ selectedStyle }) => {
  const [selectedSku, setSelectedSku] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState();

  return (
    <div className='pd-flex-col' style={{gap: '1rem'}}>
      <div className='pd-flex' style={{ gap: '1rem' }}>
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
      </div>
      <div className='pd-flex' style={{ gap: '1rem' }}>
        <div style={{display: 'flex', flex: '0 0 80%'}}>
          <button
            style={{ flexGrow: '1'}}
          >add to bag</button>
        </div>
        <div>
          <button
          
          >favorite</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCartActions;
