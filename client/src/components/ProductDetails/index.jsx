import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGallery from './ProductGallery';
import ProductStyleSelector from './ProductStyleSelector';
import ProductCartActions from './ProductCartActions';
import ProductInfo from './ProductInfo';
import ReviewStars from '../common/ReviewStars';
import SocialShare from './SocialShare';
import ProductPrice from './ProductPrice';

const ProductDetails = ({ productId }) => {
  const [productInfo, setProductInfo] = useState();
  const [productStyles, setProductStyles] = useState();
  const [selectedStyle, setSelectedStyle] = useState();
  const [numReviews, setNumReviews] = useState();
  const [reviewRating, setReviewRating] = useState();
  useEffect(() => {
    if (productId) {
      axios
        .get(`/products/${productId}`)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error('product info err?', err));
      axios
        .get(`/products/${productId}/styles`)
        .then((res) => {
          setProductStyles(res.data);
          setSelectedStyle(
            res.data?.results?.find((style) => style?.['default?'] === true)
          );
        })
        .catch((err) => console.error('product styles err?', err));
      axios
        .get(`/reviews/meta?product_id=${productId}`)
        .then((res) => {
          const ratings = res?.data?.ratings ?? {};
          let count = 0;
          let total = 0;
          Object.entries(ratings).forEach((entry) => {
            count += +(entry?.[1] ?? 0);
            total += +(entry?.[0] ?? 0) * +(entry?.[1] ?? 0);
          });
          if (count > 0) {
            setReviewRating(total / count);
            setNumReviews(count);
          }
        })
        .catch((err) => {
          console.error('product detail reviews err?', err);
        });
    }

    //reset state on product change
    return () => {
      setProductInfo(undefined);
      setProductStyles(undefined);
      setSelectedStyle(undefined);
      setReviewRating(undefined);
      setNumReviews(undefined);
    };
  }, [productId]);

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
      {(productInfo?.info || productInfo?.description) ? (
        <ProductInfo info={productInfo} />
      ) : (
        <div style={{margin: '3rem'}}></div>
      )}
      <div
        className='pd-share-container'
      >
        <SocialShare />
      </div>
    </div>
  );
};

export default ProductDetails;
