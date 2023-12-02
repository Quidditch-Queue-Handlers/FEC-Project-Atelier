import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import ProductGallery from './ProductGallery';
import ProductStyleSelector from './ProductStyleSelector';
import ProductCartActions from './ProductCartActions';
import ProductInfo from './ProductInfo';
import ReviewStars from '../common/ReviewStars';
import SocialShare from './SocialShare';
import ProductPrice from './ProductPrice';


const ProductDetails = ({ productId }) => {

  const [selectedStyle, setSelectedStyle] = useState();

  const productInfo = useSelector(
    (state) => state.productInfo.data?.[productId]
  );
  const productStyles = useSelector(
    (state) => state.productStyles.data?.[productId]
  );
  const reviewMeta = useSelector((state) => state.reviewMeta.data?.[productId]); 
  const numReviews = reviewMeta?.ratingsSummary?.count; 
  const reviewRating = reviewMeta?.ratingsSummary?.average;
 
  useEffect(() => {
    if (productStyles?.results) {
      setSelectedStyle(() => {
        let defaultStyle = productStyles.results?.find((style) => style?.['default?'] === true);
        return defaultStyle || productStyles.results[0];
      });
    }
    return () => {
      setSelectedStyle(undefined); 
    }
   
  }, [productId, productStyles]);

  return (
    <div>
      <div className='pd-flex pd-main-container'>
        <div className='pd-wide-container'>
          <ProductGallery styleInfo={selectedStyle} />
        </div>
        <div
          className='pd-flex-col pd-aside-container'
          style={{ justifyContent: 'space-around' }}
        >
          <div>
            {reviewRating !== undefined && (
              <div
                className='pd-flex pd-items-center'
                style={{ gap: '0.5rem' }}
              >
                <ReviewStars
                  rating={reviewRating}
                  ratingId={`pd-${productId}-rating`}
                />
                <a href='#reviews-header'>Read all {numReviews} reviews</a>
              </div>
            )}
            <h2>{productInfo?.category}</h2>
            <h1>{productInfo?.name}</h1>
            <ProductPrice selectedStyle={selectedStyle} />
          </div>
          <ProductStyleSelector
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            productStyles={productStyles}
          />
          <ProductCartActions selectedStyle={selectedStyle} />
        </div>
      </div>
      {productInfo?.info || productInfo?.description ? (
        <ProductInfo info={productInfo} />
      ) : (
        <div style={{ margin: '3rem' }}></div>
      )}
      <div className='pd-share-container'>
        <SocialShare />
      </div>
    </div>
  );
};

export default ProductDetails;
