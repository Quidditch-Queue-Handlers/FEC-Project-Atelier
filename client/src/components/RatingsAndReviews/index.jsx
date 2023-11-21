import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';
import ReviewsList from './ReviewsList';
// import productInfo from '../ProductDetails';

const RatingsAndReviews = ({productId}) => {

  // get info from ../ProductDetails/index.jsx ?

  // useEffect

  return (
    <div>
      <h2>Ratings & Reviews</h2>
      <ProductBreakdown />
      <RatingBreakdown />
      <ReviewsList />
    </div>
  );
}

export default RatingsAndReviews;