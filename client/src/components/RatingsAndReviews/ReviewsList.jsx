import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sorting from './Sorting';
import Review from './Review';
import WriteReview from './WriteReview';

const ReviewsList = ({productId, pageNum, count, sort}) => {

  const [productInfo, setProductInfo] = useState();

  // fix these
  pageNum = 1;
  count = 5;
  sort = "relevant";

  useEffect(() => {
    if (productId) {
      axios.get(`/reviews/${productId}`)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error('product info err?', err));
    }
  }, [productId]);

  return (
    <div>
      <h3>{count} reviews, sorted by {<Sorting/>}</h3>
      {

      /* map reviews here ONLY 2 at a time
          if more than 2, show more button
          button only shows 2 more
          all loaded, no more button
          0 reviews will only have add review button
      */

      }
      <Review />
      <Review />
      <WriteReview />
    </div>
  );
}

export default ReviewsList;