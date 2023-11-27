import request from './index';

export const getRelatedIds = () => {
  return request.get(
    'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37311/related',
  );
};

export const getDetailById = (id) => {
  return request.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}/styles`,
  );
};

export const getReviewById = (id) => {
  return request.get(
    'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/',
    {
      params: {
        page: 1,
        count: 5,
        sort: 'newest',
        product_id: id,
      },
    },
  );
};

export const getProductInfoById = (id) => {
  return request.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${id}`,
  );
};
