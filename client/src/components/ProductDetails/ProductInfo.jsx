import React from 'react';

const ProductInfo = ({ info }) => {
  return (
    <div className="pd-flex pd-info-container">
      <div className="pd-wide-container">
        <h3>
          {info?.slogan}
        </h3>
        <p>
          {info?.description}
        </p>
      </div>
      <div className="pd-aside-container pd-flex pd-items-center pd-border-l">
        <ul className="pd-features-list">
          {info?.features?.map((feature) => (
            <li key={feature.value}>{feature.feature}: {feature.value}</li>
          )
          )}
        </ul>
      </div>
    </div>

  )
}

export default ProductInfo;