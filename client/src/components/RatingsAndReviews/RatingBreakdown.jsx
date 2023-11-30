import React from 'react';

const RatingBreakdown = ({ productData }) => {
  const characteristicLabels = {
    Size: { lowest: 'Too Small', middle: 'Perfect', highest: 'Too Big' },
    Width: { lowest: 'Narrow', middle: 'Perfect', highest: 'Wide' },
    Comfort: { lowest: 'Uncomfortable', highest: 'Comfortable' },
    Quality: { lowest: 'Poor', highest: 'Great' },
    Length: { lowest: 'Too Short', middle: 'Perfect', highest: 'Too Long' },
    Fit: { lowest: 'Poor Fit', middle: 'Perfect Fit', highest: 'Too Loose' },
  };

  return (
    <div className="rr-rating-breakdown">
      <div>
        {Object.entries(productData.characteristics).map(([characteristic, data]) => (
          <div key={data.id} className="rr-characteristic-container">
            <h3 className="rr-characteristic-header">{characteristic}</h3>
            <div className="rr-rating-bar">
              {(() => {
                const ratingBarArray = [];
                for (let index = 0; index < 5; index++) {
                  ratingBarArray.push(
                    <div key={index} className="rr-rating-bar-gray">
                      {index + 1 <= parseFloat(data.value).toFixed(2) && (
                        <span className="rr-rating-blue" />
                      )}
                    </div>
                  );
                }
                return ratingBarArray;
              })()}
            </div>

            <div className="rr-characteristic-labels">
              <span className="rr-characteristic-label">{characteristicLabels[characteristic].lowest}</span>
              {characteristicLabels[characteristic]?.middle && (
                <span className="rr-characteristic-label">{characteristicLabels[characteristic].middle}</span>
              )}
              <span className="rr-characteristic-label">{characteristicLabels[characteristic].highest}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingBreakdown;