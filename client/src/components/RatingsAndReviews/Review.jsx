import React, {useState} from 'react';

const Review = ({review}) => {

  const [showFullBody, setShowFullBody] = useState(false);
  const [bigPhotoSrc, setBigPhotoSrc] = useState("");
  const [showModal, setShowModal] = useState(false);

  // const openPhoto = (clickedPhoto) => {
  //   const photo = document.getElementById('rr-photoModal');
  //   const bigPhoto = document.getElementById('fullResolution');
  //   bigPhoto.src = clickedPhoto;
  //   photo.classList.add('rr-modal-visible');
  // }

  // const closePhoto = () => {
  //   const photo = document.getElementById('rr-photoModal');
  //   photo.classList.remove('rr-modal-visible');
  // }

  const toggleShowFullBody = () => {
    setShowFullBody(showFullBody => !showFullBody);
  };

  const toggleShowModal = (clickedPhoto) => {
    setBigPhotoSrc(clickedPhoto.url);
    setShowModal(showModal => !showModal);
  };

  const body = showFullBody ? review.body + " Show Less" : `${review.body.slice(0, 250)}... Show More`;

  return (
    <div className="rr-review-container">
      <div className="rr-header">
        <h2>---Hello from Individual Review---</h2>
        <div>***** Rating: {review.rating}</div>
        <div>VERIFIED {review.reviewer_name}, {new Date(Date.parse(review.date)).toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})}</div>
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

      {review.recommend && (
        <div className="rr-recommendation">
          <div>Check! I recommend this product</div>
        </div>
      )}

      {review.response && (
        <div className="rr-response">
          <h4>Response from seller:</h4>
          <p>{review.response}</p>
        </div>
      )}

      <div className="rr-feedback">
        <div /* onClick={() => review.helpfulness + 1} */>Helpful? Yes ({review.helpfulness}) | No (#) | Report</div>
        { /* fix yes vote and report link
        yes click will POST */ }
      </div>

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