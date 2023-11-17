import React from 'react';
import ProductDetails from './components/ProductDetails';
import RelatedItems from './components/RelatedItems';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import RatingsAndReviews from './components/RatingsAndReviews';
import './global.css';

const App = () => {
  return (
    <div>hello from app</div>;
    <ProductDetails />
    <RelatedItems />
    <QuestionsAndAnswers />
    <RatingsAndReviews />
  )
}

export default App;
