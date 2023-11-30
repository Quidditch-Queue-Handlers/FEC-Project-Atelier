import React, { useState } from 'react';

const WriteReview = ({ productId, onReviewSubmit }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [recommendation, setRecommendation] = useState('');

  const handleRatingClick = (rating) => {
    setOverallRating(rating);
  };

  const handleRecommendationChange = (value) => {
    setRecommendation(value);
  };

  const handleReviewSubmit = () => {
    setModalOpen(false);
  };

  return (
    <div className="rr-write-review">
      <button onClick={() => setModalOpen(true)}>Add A Review +</button>

      {modalOpen && (
        <div className="rr-write-review-modal">
          <h2>Write Your Review</h2>
          <h3>About the {productId}</h3>

          <button onClick={handleReviewSubmit}>Submit Review</button>
          <button onClick={() => setModalOpen(false)}>Close Modal</button>
        </div>
      )}
    </div>
  );
}

export default WriteReview;