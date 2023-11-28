import React from 'react';
import ReviewStars from '../common/ReviewStars';

const ProductBreakdown = ({reviewMeta}) => {
  const ratings = reviewMeta.ratings;
  const ones = parseInt(ratings["1"]);
  const twos = parseInt(ratings["2"]);
  const threes = parseInt(ratings["3"]);
  const fours = parseInt(ratings["4"]);
  const fives = parseInt(ratings["5"]);
  const totalScore = ones + twos*2 + threes*3 + fours*4 + fives*5;
  const totalRatings = ones + twos + threes + fours + fives;
  const average = (totalScore/totalRatings).toFixed(1);
  console.log(average)

  return (
    <div className="rr-product-breakdown">
      <div className="rr-average-rating">{average}</div>
      <ReviewStars rating={average} ratingId={average}/>
    </div>
  );
}

export default ProductBreakdown;