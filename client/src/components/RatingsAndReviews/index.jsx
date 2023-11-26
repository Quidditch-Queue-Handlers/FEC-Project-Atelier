import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';
import ReviewsList from './ReviewsList';

const RatingsAndReviews = ({productId}) => {

  const [reviews, setReviews] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState([]);
  const [count, setCount] = useState(0);
  const [currentSort, setCurrentSort] = useState("relevance");

  useEffect(() => {
    if (productId) {
      axios.get(`/reviews/?product_id=${productId}`)
        .then((res) => {
          setReviews(res.data.results)
          setCount(res.data.count)
        })
        .catch((err) => console.error('reviews list err?', err));
      axios.get(`/reviews/meta?product_id=${productId}`)
        .then((res) => setReviewsMeta(res.data))
        .catch((err) => console.error('reviews meta err?', err));
    }
  }, [productId]);

  // POST /reviews

  // PUT
    // HLEPFUL /reviews/:review_id/helpful
    // REPORT /reviews/:review_id/report

  return (
    <div>
      <h2 className="rr-title">Ratings & Reviews</h2>
    <div className="rr-container">
      <div className="rr-breakdowns-container">
        <ProductBreakdown />
        <RatingBreakdown />
      </div>
      <div className="rr-reviewsList-container">
        <ReviewsList reviews={reviews} count={count} sort={currentSort}/>
      </div>
    </div>
    </div>
  );
}

export default RatingsAndReviews;