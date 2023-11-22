import React, { useState } from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';

const ProductCartActions = ({ selectedStyle }) => {
  const [selectedSku, setSelectedSku] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState();

  return (
    <div className='pd-flex-col' style={{gap: '2rem'}}>
      <div className='pd-flex' style={{ gap: '2rem' }}>
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
      <div className='pd-flex' style={{ gap: '2rem' }}>
        <div style={{display: 'flex', flex: '0 0 80%'}}>
          <button
            style={{ flexGrow: '1'}}
          >add to bag</button>
        </div>
        <button style={{ flexGrow: '1'}}>&#9734;</button>
      </div>
    </div>
  );
};

export default ProductCartActions;
