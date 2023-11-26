import React from 'react';
import ReviewStars from '../common/ReviewStars'

const Review = ({review}) => {
  return (
    <div className="rr-review-container">
      <div className="rr-header">
        <div>
          <ReviewStars rating={review.rating}/>
        </div>
        <div>VERIFIED {review.reviewer_name}, {review.date}</div>
      </div>

      <div className="rr-summary">
        <h3>{review.summary}</h3>
        <p>{review.body}</p>
      </div>

      <div className="rr-images">
        {review.photos.map((url, id) => (
          <img key={id} src={url} alt={`Image ${id}`} />
        ))}
      </div>

      {review.recommend && (
        <div className="rr-recommendation">
          <div>Check! I recommend this product</div>
        </div>
      )}

      {review.response && (
        <div className="rr-response">
          <h4>Response:</h4>
          <p>{review.response}</p>
        </div>
      )}

      <div className="rr-feedback">
        <div /* onClick={() => review.helpfulness + 1} */>Helpful? Yes ({review.helpfulness}) | Report</div>
        { /* fix yes vote and report link */ }
      </div>
    </div>
  );
}

export default Review;