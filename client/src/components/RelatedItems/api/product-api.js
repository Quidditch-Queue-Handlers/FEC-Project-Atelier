import axios from 'axios';
import {productId} from '../RelatedItems'



export const getRelatedIds = (productId) => {
  return axios.get(`/products/${productId}/related`);
};

export const getDetailById = (id) => {
  return axios.get(`/products/${id}/styles`);
};

// export const getReviewById = (id) => {
//   return axios.get('/reviews/', {
//     params: {
//       page: 1,
//       count: 5,
//       sort: 'newest',
//       productId: id,
//     },
//   });
// };
export const getReviewsMeta = (id) => {
  return axios.get(`/reviews/meta`, {
    params: {
      product_id: id,
    },
  });
};

export const getProductInfoById = (id) => {
  return axios.get(`/products/${id}`);
};