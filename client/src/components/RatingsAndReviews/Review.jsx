import React, {useState} from 'react';

const Review = ({review}) => {

  const [showFullBody, setShowFullBody] = useState(false);

  // Open modal function
  const openPhoto = (clickedPhoto) => {
    const photo = document.getElementById('rr-photoModal');
    const bigPhoto = document.getElementById('fullResolution');
    // Set the source of the full-resolution image
    bigPhoto.src = clickedPhoto;
    // Display the modal
    photo.classList.add('rr-modal-visible');
  }

  // Close modal function
  const closePhoto = () => {
    const photo = document.getElementById('rr-photoModal');
    // Hide the modal
    photo.classList.remove('rr-modal-visible');
  }

  const toggleShowFullBody = () => {
    setShowFullBody(!showFullBody);
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
          <img key={id} src={url} alt={`Image ${id}`} className="rr-thumbnail" onClick={() => openPhoto(url)}/>
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
        <div /* onClick={() => review.helpfulness + 1} */>Helpful? Yes ({review.helpfulness}) | Report</div>
        { /* fix yes vote and report link
        yes click will PUT and update  */ }
      </div>

      <div id="rr-photoModal" className="rr-modal">
        <span className="rr-close" onClick={closePhoto}>&times;</span>
        <img src="" alt="Full Resolution" id="fullResolution" className="rr-modal-content" />
      </div>

    </div>
  );
}

export default Review;