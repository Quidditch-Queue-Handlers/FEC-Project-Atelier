import React from 'react';
import axios from 'axios';
import ReviewStars from '../common/ReviewStars'

const Review = ({review, recommended}) => {
  // console.log(recommended)

  const {review_id, rating, reviewer_name, date, summary, body, photos, recommend, response, helpfulness} = review;

  const handleHelpful = () => {
    axios.put(`/reviews/${review_id}/helpful`)
      .then(() => console.log('Helpfulness vote success'))
      .catch((err) => console.error('Helpfulness vote err:', err));
  }

  const handleReport = () => {
    axios.put(`/reviews/${review_id}/report`)
      .then(() => console.log('Report successful'))
      .catch((err) => console.error('Report err:', err));
  }

  return (
    <div className="rr-review-container">
      <div className="rr-header">
        <div>
          <ReviewStars rating={rating} ratingId={review_id}/>
        </div>
        <div>VERIFIED {reviewer_name}, {new Date(Date.parse(date)).toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})}</div>
      </div>

      <div className="rr-summary">
        <h3>{review.summary.replace(/(.{60}).*/, '$1...')}</h3>
        <p className="rr-review-body" onClick={toggleShowFullBody}>{body}</p>
      </div>

      <div className="rr-images">
        {review.photos.map((url, id) => (
          <img key={id} src={url} alt={`Image ${id}`} className="rr-thumbnail" onClick={() => toggleShowModal(url)}/>
        ))}
      </div>

      {recommend && (
        <div className="rr-recommendation">
          <div>Check! I recommend this product</div>
        </div>
      )}

      {response && (
        <div className="rr-response">
          <h4>Response from seller:</h4>
          <p>{response}</p>
        </div>
      )}

      {recommended &&
        <div className="rr-feedback">
          <div>Helpful? <span> </span>
            <a className="rr-a" onClick={() => handleHelpful()}>Yes</a> ({helpfulness}) |
            <span> </span>
            <a className="rr-a" onClick={() => handleReport()}>Report</a>
          </div>
        </div>
      }
    </div>
  );
}

export default Review;