import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sorting from './Sorting';
import Review from './Review';
import WriteReview from './WriteReview';

const ReviewsList = ({reviews, count, sort, recommend, setSort}) => {

  const [reviewsList, setReviewsList] = useState(reviews);
  const [numShowReviews, setNumShowReviews] = useState(2);


  const showTwoMoreReviews = () => setNumShowReviews(currCount => currCount + 2);

  useEffect(() => {
    setReviewsList(reviews);
  }, [reviewsList])

  return (
    <div>
      <div className="rr-sort">
        <h3>{count} reviews, sorted by {<Sorting sort={sort} setSort={setSort}/>}</h3>
      </div>
      {reviews.slice(0, numShowReviews).map((review, index) => {
        return (
          <div key={index}>
            <Review review={review} recommended={recommend}/>
          </div>
        )
      })}
      <div className="rr-buttons-container">
        {reviews.length > numShowReviews && (
          <button className="rr-more-reviews" onClick={showTwoMoreReviews}>More Reviews</button>
        )}
        <WriteReview/>
      </div>
    </div>
  );
}

export default ReviewsList;