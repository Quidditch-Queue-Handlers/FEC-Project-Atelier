import React, { useState, useRef } from 'react';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import axios from 'axios'; 

const ProductCartActions = ({ selectedStyle }) => {
  const sizeSelectRef = useRef(null); 
  const [selectedSku, setSelectedSku] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState();
  const [showLabel, setShowLabel] = useState(false); 
  const inStockSkus = Object.entries(selectedStyle?.skus ?? {})?.filter(sku => (sku?.[1]?.quantity ?? 0) > 0);

  const handleAddToCart = () => {
    if(!selectedSku) {
      setShowLabel(true); 
      sizeSelectRef?.current?.focus();
    } else if (selectedSku && selectedQuantity) {
      setShowLabel(false);
      axios.post('/cart', {sku_id: +selectedSku})
      .then(() => {
        alert(`added to cart: ${selectedStyle?.name}\nsku: ${selectedSku}\nquantity:${selectedQuantity}`)
      })
      .catch((err) => {
        console.error(err); 
        alert('error adding to cart');
      })
    }
  }

  return (
    <div className='pd-flex-col' style={{gap: '2rem'}}>
      <div className='pd-flex' style={{ gap: '2rem' }}>
        <div 
          style={{ display: 'flex', flex: '0 0 70%'}}
        >
          <SizeSelector
            inStockSkus={inStockSkus}
            selectedSku={selectedSku}
            setSelectedSku={setSelectedSku}
            sizeSelectRef={sizeSelectRef}
            showLabel={showLabel}
          />
        </div>
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
            disabled={inStockSkus.length === 0}
            style={{ flexGrow: '1'}}
            onClick={handleAddToCart}
          >Add to Cart</button>
        </div>
        <button style={{ flexGrow: '1'}}>&#9734;</button>
      </div>
    </div>
  );
};

export default ProductCartActions;
