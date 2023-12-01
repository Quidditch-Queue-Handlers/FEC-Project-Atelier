import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductBreakdown from './ProductBreakdown';
import RatingBreakdown from './RatingBreakdown';
import ReviewsList from './ReviewsList';

const RatingsAndReviews = ({productId}) => {

  const [reviews, setReviews] = useState([]);
  const [reviewsMeta, setReviewsMeta] = useState(null);
  const [count, setCount] = useState(5);
  const [sort, setSort] = useState("relevant");

  useEffect(() => {
    if (productId) {
      axios.get(`/reviews/?product_id=${productId}&sort=${sort}&count=${count}`)
        .then((res) => {
          setReviews(res.data.results)
          setCount(res.data.count)
        })
        .catch((err) => console.error('reviews list err?', err));
      axios.get(`/reviews/meta?product_id=${productId}`)
        .then((res) => {
          setReviewsMeta(res.data)
          const ratingsArray = Object.entries(res.data.ratings).map(([stars, count]) => ({
            stars: parseInt(stars, 10),
            count: parseInt(count, 10),
          }))
          const totalReviews = ratingsArray.reduce((accum, rating) => {
            return accum + rating.count
          }, 0)
          setCount(totalReviews)
        })
        .catch((err) => console.error('reviews meta err?', err));

  // POST /reviews

    }
  }, [productId, sort]);

  return (
    <div className="rr-full-container">
      <h2 className="rr-title" id="reviews-header">Ratings & Reviews</h2>
      {reviewsMeta !== null && (
        <div className="rr-container">
            <div className="rr-breakdowns-container">
              <ProductBreakdown reviewMeta={reviewsMeta}/>
              <RatingBreakdown productData={reviewsMeta}/>
            </div>

          <div className="rr-reviewsList-container">
            <ReviewsList reviews={reviews} count={count} recommend={reviewsMeta.recommended} sort={sort} setSort={setSort}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default RatingsAndReviews;