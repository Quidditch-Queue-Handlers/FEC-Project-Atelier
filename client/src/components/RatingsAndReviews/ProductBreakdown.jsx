import React from 'react';
import ReviewStars from '../common/ReviewStars';
import RatingBars from './RatingBars'

const ProductBreakdown = ({reviewMeta}) => {

  const ratings = reviewMeta.ratings;
  const ratingsArray = Object.entries(ratings).map(([stars, count]) => ({
    stars: parseInt(stars, 10),
    count: parseInt(count, 10),
  }));
  const totalScore = ratingsArray.reduce((accum, rating) => {
    return accum + rating.stars * rating.count
  }, 0);
  const totalRatings = ratingsArray.reduce((accum, rating) => {
    return accum + rating.count
  }, 0);
  const average = (totalScore / totalRatings).toFixed(1);

  return (
    <div>
      <div className="rr-product-breakdown">
        <span className="rr-average-rating">{average}</span>
        <ReviewStars rating={average} ratingId={average}
        className="rr-prod-stars" style={{height: '5rem'}}/>
      </div>

      <div>
        <h2 style={{padding: '10px 0px'}}>% of reviews recommend this product</h2>
        <RatingBars ratingsData={ratingsArray} />
      </div>
    </div>
  );
};

export default ProductBreakdown;