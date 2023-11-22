import React, { useEffect } from "react";
import Selector from "./Selector";

const MAX_QUANTITY = 15;

const QuantitySelector = ({
  selectedSku,
  selectedStyle,
  selectedQuantity,
  setSelectedQuantity,
}) => {
  const quantity = Math.min(
    MAX_QUANTITY,
    Object.entries(selectedStyle?.skus ?? {})?.find(
      (sku) => sku?.[0] === "" + selectedSku
    )?.[1]?.quantity ?? 0
  );

  const quantityArray = new Array(quantity).fill(0).map((v, i) => i + 1);

  //set quantity on sku change
  useEffect(() => {
    if (selectedSku && quantity > 0) {
      setSelectedQuantity(1);
    } else {
      setSelectedQuantity(undefined);
    }
  }, [selectedSku]);

  return (
    <Selector
      name="quantity"
      id="quantity-select"
      value={selectedQuantity}
      disabled={!selectedSku}
      onChange={(q) => setSelectedQuantity(q)}
    >
      <option value="">{"-"}</option>
      {quantityArray.map((q) => (
        <option key={selectedSku + q} value={q}>
          {q}
        </option>
      ))}
    </Selector>
  );
};

export default QuantitySelector;
