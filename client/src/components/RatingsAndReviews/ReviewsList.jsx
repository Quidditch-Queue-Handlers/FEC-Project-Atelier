import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sorting from './Sorting';
import Review from './Review';
import WriteReview from './WriteReview';

const ReviewsList = ({productId, pageNum, count, sort}) => {

<<<<<<< HEAD
  const [productInfo, setProductInfo] = useState();
=======
  const tempData = {
    "product": "2",
    "page": 0,
    "count": 5,
    "results": [
      {
        "review_id": 5,
        "rating": 1,
        "summary": "I'm enjoying wearing these shades yepppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
        "recommend": false,
        "response": null,
        "body": "It do be like that sometimes yellow blue green red purple pink orange green turquoise white black gray brown tan yellow blue green red purple pink orange green turquoise white black gray brown tan yellow blue green red purple pink orange green turquoise white black gray brown tan",
        "date": "2019-04-14T00:00:00.000Z",
        "reviewer_name": "shortandsweeet",
        "helpfulness": 15,
        "photos": [{
            "id": 1,
            "url": "urlplaceholder/review_5_photo_number_1.jpg"
          },
          {
            "id": 2,
            "url": "urlplaceholder/review_5_photo_number_2.jpg"
          },
        ]
      },
      {
        "review_id": 2,
        "rating": 5,
        "summary": "I am liking these glasses",
        "recommend": true,
        "response": "Glad you're enjoying the product!",
        "body": "They are very dark. But that's good because I'm in very sunny spots",
        "date": "2019-06-23T00:00:00.000Z",
        "reviewer_name": "bigbrotherbenjamin",
        "helpfulness": 98,
        "photos": [],
      },
      {
        "review_id": 4,
        "rating": 3,
        "summary": "I'm enjoying wearing these shades",
        "recommend": false,
        "response": null,
        "body": "Comfortable and practical.",
        "date": "2019-04-14T00:00:00.000Z",
        "reviewer_name": "logicalthunker",
        "helpfulness": 5,
        "photos": [{
            "id": 1,
            "url": "urlplaceholder/review_5_photo_number_1.jpg"
          },
          {
            "id": 2,
            "url": "urlplaceholder/review_5_photo_number_2.jpg"
          },
        ]
      },
      {
        "review_id": 3,
        "rating": 2,
        "summary": "I'm enjoying wearing these shades",
        "recommend": true,
        "response": null,
        "body": "Comfy time.",
        "date": "2019-04-14T00:00:00.000Z",
        "reviewer_name": "longjohnsilver",
        "helpfulness": 4,
        "photos": [{
            "id": 1,
            "url": "urlplaceholder/review_5_photo_number_1.jpg"
          },
          {
            "id": 2,
            "url": "urlplaceholder/review_5_photo_number_2.jpg"
          },
        ]
      },
      {
        "review_id": 1,
        "rating": 4,
        "summary": "I'm enjoying wearing these shades",
        "recommend": false,
        "response": null,
        "body": "They block the sun.",
        "date": "2019-04-14T00:00:00.000Z",
        "reviewer_name": "hihungryimdad",
        "helpfulness": 511,
        "photos": [{
            "id": 1,
            "url": "urlplaceholder/review_5_photo_number_1.jpg"
          },
          {
            "id": 2,
            "url": "urlplaceholder/review_5_photo_number_2.jpg"
          },
        ]
      },
    ]
  };

  const [productInfo, setProductInfo] = useState(tempData);
  const [numShowReviews, setNumShowReviews] = useState(2);

  const showTwoMoreReviews = () => setNumShowReviews(currCount => currCount + 2);
>>>>>>> b45469a (made date appear correctly, made body toggle for show more or less, created photo modal popup)

  // fix these
  pageNum = productInfo.page;
  count = productInfo.count;
  sort = "relevance";

  useEffect(() => {
    if (productId) {
      axios.get(`/reviews/${productId}`)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error('product info err?', err));
    }
  }, [productId]);

  return (
    <div>
      <div className="rr-sort">
        <h3>{count} reviews, sorted by {<Sorting/>}</h3>
      </div>
      {productInfo.results.slice(0, numShowReviews).map((review, index) => {
        return (
          <div key={index}>
            <Review review={review}/>
          </div>
        )
      })}
      <div className="rr-buttons-container">
        {productInfo.results.length > numShowReviews && (
          <button className="rr-more-reviews" onClick={showTwoMoreReviews}>More Reviews</button>
        )}
        <WriteReview/>
      </div>
    </div>
  );
}

export default ReviewsList;