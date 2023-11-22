import React from 'react';
import Selector from './Selector';

const SizeSelector = ({ inStockSkus, selectedSku, setSelectedSku, sizeSelectRef, showLabel }) => {
  
  const disabled = inStockSkus.length === 0; 
  
  return (
      <Selector
        name="sizes"
        id="size-select"
        label={`Please select size`}
        value={selectedSku}
        disabled={disabled}
        onChange={(sku) => setSelectedSku(sku)}
        selectRef={sizeSelectRef}
        showLabel={showLabel}
      >
        <option value="">
          {disabled 
            ? 'Out of Stock' 
            : 'Select Size'
          }
        </option>
        {inStockSkus?.map(([id, sku]) => (
          <option key={id} value={id}>
            {sku.size}
          </option>
        ))}
      </Selector>
  );
};

export default SizeSelector;
