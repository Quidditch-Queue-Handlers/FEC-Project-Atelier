import React from 'react';

const Review = () => {
  return (
    <div className="rr-review-container">
      <div className="rr-header">
        <h2>Hello from Individual Review</h2>
        <div>*****</div>
        <div>VERIFIED username12345, Month DD, YYYY</div>
      </div>

      <div className="rr-summary">
        <h3>Review Summary</h3>
        <p>Review Body</p>
      </div>

      <div className="rr-images">
        <img src="image1.jpg" alt="Image 1" />
        <img src="image2.jpg" alt="Image 2" />
        { /*

        images.map((src, index) => (
          <img key={index} src={src} alt={`Image ${index + 1}`} />
        ))

        Fix mapping of images

        */ }
      </div>

      <div className="rr-recommendation">
        <div>Check! I recommend this product</div>
      </div>

      <div className="rr-response">
        <h3>Response:</h3>
        <p>Response Body</p>
      </div>

      <div className="rr-feedback">
        <div>Helpful? Yes (9) | Report</div>
        { /* fix yes vote and report link */ }
      </div>
    </div>
  );
}

export default Review;