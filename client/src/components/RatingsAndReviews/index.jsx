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
      <h2 className="rr-title" id="reviews-header">Ratings & Reviews</h2>
    <div className="rr-container">
      <div className="rr-breakdowns-container">
        <ProductBreakdown />
        <RatingBreakdown />
      </div>
      <div className="rr-reviewsList-container">
        <ReviewsList />
      </div>
    </div>
    </div>
  );
}

export default RatingsAndReviews;