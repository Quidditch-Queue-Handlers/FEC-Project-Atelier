import React from 'react';
import Sorting from './Sorting';
import Review from './Review';
import WriteReview from './WriteReview';

const ReviewsList = () => {
  return (
    <div>
      <h3># of reviews, sorted by {<Sorting/>}</h3>
      {/* map reviews here ONLY 2 at a time */}
      <Review />
      <Review />
      <WriteReview />
    </div>
  );
}

export default ReviewsList;