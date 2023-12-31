import React from 'react';
import ImageThumbnail from '../shared/ImageThumbnail';

const ProductStyleSelector = ({
  selectedStyle,
  setSelectedStyle,
  productStyles,
}) => {

  const handleStyleChange = (id) => {
    const newSelectedStyle = productStyles?.results?.find((style) => style.style_id === +id);
    const selectedRadio = document.getElementById(`radio_${newSelectedStyle?.style_id}`);
    selectedRadio?.focus();
    setSelectedStyle(newSelectedStyle);
  };

  return (
    <div>
      <h2>
        <span style={{ fontWeight: "bold" }}>{"Style > "}</span>
        {selectedStyle?.name}
      </h2>
      <fieldset className="pd-sku-grid">
        {productStyles?.results?.map((style) => (
          <div
            key={style?.style_id}
            onClick={(e) => {
              e.stopPropagation();
              handleStyleChange(style?.style_id);
            }}
          >
            <ImageThumbnail
              src={style?.photos?.[0]?.thumbnail_url}
              alt={`style ${style?.name} select preview`}
            >
              <label 
                htmlFor={`radio_${style?.style_id}`} 
                className="pd-visual-hidden"
              >
                {style?.name}
              </label>
              <input
                id={`radio_${style?.style_id}`}
                type="radio"
                name="style"
                value={style?.style_id}
                checked={selectedStyle?.style_id === style?.style_id}
                onChange={(event) => {
                  handleStyleChange(+event.target.value);
                }}
              />
            </ImageThumbnail>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default ProductStyleSelector;
