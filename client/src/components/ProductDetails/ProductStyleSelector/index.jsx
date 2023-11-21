import React from "react";

const ProductStyleSelector = ({
  selectedStyle,
  setSelectedStyle,
  productStyles,
}) => {
  const handleStyleChange = (id) => {
    setSelectedStyle(
      productStyles?.results?.find((style) => style.style_id === +id)
    );
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
            className="pd-grid-img-container"
          >
            <label htmlFor={`radio_${style?.style_id}`} className="pd-visual-hidden">{style?.name}</label>
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
            <span>
              <img 
                src={style?.photos?.[0]?.thumbnail_url} 
                alt={`style ${style?.name} select preview`}
              />
            </span>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default ProductStyleSelector;
