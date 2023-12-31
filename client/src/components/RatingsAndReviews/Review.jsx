import React, {useState} from 'react';
import axios from 'axios';
import ReviewStars from '../common/ReviewStars'

const Review = ({review, recommended}) => {
  const {review_id, rating, reviewer_name, date, summary, photos, recommend, response, helpfulness} = review;

  const [showFullBody, setShowFullBody] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigPhotoSrc, setBigPhotoSrc] = useState("");
  const [reported, setReported] = useState("Report");
  const [helpful, setHelpful] = useState(helpfulness);


  const handleHelpful = () => {
    axios.put(`/reviews/${review_id}/helpful`)
      .then(() => {
        console.log('Helpfulness vote success')
        setHelpful((helpful) => helpful + 1)
      })
      .catch((err) => console.error('Helpfulness vote err:', err));
  }

  const handleReport = () => {
    axios.put(`/reviews/${review_id}/report`)
      .then(() => {
        console.log('Report successful')
        setReported("Reported")
      })
      .catch((err) => console.error('Report err:', err));
  }

  const toggleShowFullBody = () => {
    setShowFullBody(showFullBody => !showFullBody);
  };

  const toggleShowModal = (clickedPhotoUrl) => {
    // console.log(clickedPhotoUrl)
    setBigPhotoSrc(clickedPhotoUrl);
    setShowModal(showModal => !showModal);
  };

  const body = showFullBody ? review.body + ' Show Less' : `${review.body.slice(0, 250)}`;

  return (
    <div className="rr-review-container">
      <div className="rr-header">
        <div style={{marginLeft: "1rem"}}>
          <ReviewStars rating={rating} ratingId={review_id} />
        </div>
        <div style={{display: "flex", justifyContent: "end", marginRight: "1rem"}}>&#x1F5F9; {reviewer_name}, {new Date(Date.parse(date)).toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})}</div>
      </div>

      <div className="rr-summary">
        <h3>{review.summary.replace(/(.{60}).*/, '$1...')}</h3>
        <p className="rr-review-body" >{body}</p>
        {!showFullBody && review.body.length > 250 && (
          <span onClick={toggleShowFullBody}>... Show More</span>
        )}
      </div>

      <div className="rr-images">
        {review.photos && review.photos.length > 0 && review.photos.map((photo, id) => (
          <img key={id} src={photo.url} alt={`Undefined Image ${id}`} className="rr-thumbnail" onClick={() => toggleShowModal(photo.url)}/>
        ))}
      </div>

      {recommend && (
        <div className="rr-recommendation">
          <div>✓ I recommend this product</div>
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
            <button className="rr-link-button" onClick={() => handleHelpful()}>Yes</button> ({helpful}) |
            <span> </span>
            <button className="rr-link-button" onClick={() => handleReport()}>{reported}</button>
          </div>
        </div>
      }

      {showModal &&
        <div className={`rr-modal ${showModal ? 'rr-modal-visible' : 'rr-modal-hidden'}`}>
          <span className="rr-close" onClick={toggleShowModal}>&times;</span>
          <img src={bigPhotoSrc} alt="Full Resolution" className="rr-modal-content" />
        </div>
      }
    </div>
  );
}

export default Review;