import React from 'react';
import Selector from './Selector';

const SizeSelector = ({ selectedStyle, selectedSku, setSelectedSku }) => {
  return (
    <Selector
      name="sizes"
      id="size-select"
      value={selectedSku}
      onChange={(sku) => setSelectedSku(sku)}
    >
      <option value="">Select Size</option>
      {Object.entries(selectedStyle?.skus ?? {})?.map(([id, sku]) => (
        <option key={id} value={id}>
          {sku.size}
        </option>
      ))}
    </Selector>
  );
};

export default SizeSelector;
