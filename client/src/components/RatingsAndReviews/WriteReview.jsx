import React, { useState } from 'react';
import axios from 'axios';
import ReviewStars from '../common/ReviewStars';

const WriteReview = ({ productId, productName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [recommendation, setRecommendation] = useState(false);
  const [characteristics, setCharacteristics] = useState({});
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
  const regex = /^[\w-.]+@[\w-.]+\.[A-Za-z]{2,4}$/;

  const reviewData = {
    product_id: 40346,
    rating: overallRating,
    summary: reviewSummary,
    body: reviewBody,
    recommend: recommendation,
    name: nickname,
    email: email,
    photos: photos,
    characteristics: characteristics,
  };

  const onReviewSubmit = () => {
    axios.post('/reviews', reviewData)
      .then(() => console.log('review submit successful'))
      .catch((err) => console.error('review post err', err));
}

  const handleRatingChange = (newRating) => {
    setOverallRating(newRating);
  };

  const handleRecommendationChange = (value) => {
    setRecommendation(value);
  };

  const handleReviewSubmit = () => {
    if (overallRating && reviewBody && nickname && email) {
      setRequiredFieldsFilled(true);
    }
    if (requiredFieldsFilled) {
      if (regex.test(email)) {
        onReviewSubmit(productId, overallRating, reviewSummary, reviewBody, recommendation, nickname, email, photos, characteristics);
        setModalOpen(false);
      } else {
        prompt("Invalid email", "please close this prompt and fix or click close button");
      }
    } else {
      alert("You must enter required fields");
    }
  };


  return (
    <div>
      {!modalOpen && (
        <button onClick={() => setModalOpen(true)}>Add A Review +</button>
      )}

    <span style={{ position: "relative" }}>
      {modalOpen && (
        <>
          <div className="qa-modal-container"></div>
          <div className="qa-modal">
            <h2>Write Your Review</h2>
            <h3>About the {productName}</h3>

            <label>Overall Rating:*
              <ReviewStars
                  rating={overallRating}
                  onRatingChange={(newRating) => {
                    handleRatingChange(newRating);
                  }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center' }}>
              Do you recommend this product?*
              <div style={{ marginLeft: '10px' }}>
                <input type="radio" name="recommendation" value="Yes" onChange={() => handleRecommendationChange(true)} /> Yes
              </div>
              <div style={{ marginLeft: '10px' }}>
                <input type="radio" name="recommendation" value="No" onChange={() => handleRecommendationChange(false)} /> No
              </div>
            </label>

            <label>Characteristics:*</label>

            <label>Review Summary/Title:</label>
            <textarea
              maxLength="60"
              cols="48"
              rows="2"
              value={reviewSummary}
              onChange={(e) => setReviewSummary(e.target.value)}
              ></textarea>

              <label>Review Details:*</label>
              <div style={{ position: 'relative' }}>
                <textarea
                  minLength="50"
                  maxLength="1000"
                  cols="48"
                  rows="4"
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                ></textarea>
                <div style={{ position: 'absolute', bottom: '5px', right: '5px', color: reviewBody.length >= 50 && reviewBody.length <= 1000 ? 'black' : 'red' }}>
                  {`${reviewBody.length}/50`}
                </div>
            </div>

            <label>Upload Your Photos
              <input type="file" accept="image/*" onChange={(e) => setPhotos(e.target.files)}/>
            </label>

            <label>What is your nickname?*
              <input
                maxLength="60"
                placeholder={'Example: jackson11!'}
                onChange={(e) => setNickname(e.target.value)}
              ></input>
            </label>
            <p>For privacy reasons, do not use your full name or email address</p>
            <label>Your Email:*
              <input
                maxLength="60"
                placeholder={'Example: jack@email.com'}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>
            <p>For authentication reasons, you will not be emailed</p>
            <h4>Submit Review</h4>

            <button onClick={handleReviewSubmit}>Submit Review</button>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </>
      )}
    </span>
    </div>
  );
};

export default WriteReview;
