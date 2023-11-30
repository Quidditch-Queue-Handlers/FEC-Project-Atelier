import React from 'react';

const RatingBar = ({ stars, count, totalReviews }) => {

  const greenBarWidth = `${(count / totalReviews) * 100}%`;
  const grayBarWidth = `${(count / totalReviews) * 100}%`;

  return (
    <div className="rr-rating-container">
      <div className="rr-bar">
        <div className="rr-green-bar" style={{ width: greenBarWidth }}></div>
        {/* <div className="rr-gray-bar" style={{ width: grayBarWidth }}></div> */}
      </div>
      <div className="rr-label">{`${stars} Stars (${count})`}</div>
    </div>
  );
};

const RatingBars = ({ ratingsData }) => {
  const totalReviews = ratingsData.reduce((accum, rating) => {
    return accum + rating.count
  }, 0);

  return (
    <div id="rr-rating-container">
      {ratingsData.map((rating) => (
        <RatingBar key={rating.stars} stars={rating.stars} count={rating.count} totalReviews={totalReviews} />
      ))}
    </div>
  );
};

export default RatingBars;
