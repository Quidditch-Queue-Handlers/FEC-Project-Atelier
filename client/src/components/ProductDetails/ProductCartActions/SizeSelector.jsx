import React from 'react';
import Selector from './Selector';

const SizeSelector = ({ selectedStyle, selectedSku, setSelectedSku }) => {
  
  const skus = Object.entries(selectedStyle?.skus ?? {})?.filter(sku => (sku?.[1]?.quantity ?? 0) > 0);
  const disabled = skus.length === 0; 
  return (
    <div 
      style={{ display: 'flex', flex: '0 0 70%'}}
    >
      <Selector
        name="sizes"
        id="size-select"
        value={selectedSku}
        disabled={disabled}
        onChange={(sku) => setSelectedSku(sku)}
      >
        <option value="">
          {disabled 
            ? 'Out of Stock' 
            : 'Select Size'
          }
        </option>
        {skus?.map(([id, sku]) => (
          <option key={id} value={id}>
            {sku.size}
          </option>
        ))}
      </Selector>
    </div>
  );
};

export default SizeSelector;
