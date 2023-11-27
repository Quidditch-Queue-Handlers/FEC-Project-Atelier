import React from 'react';
import ProductDetails from './components/ProductDetails';
import RelatedItems from './components/RelatedItems';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import RatingsAndReviews from './components/RatingsAndReviews';
import './global.css';

const App = () => {
  return (
    <div>hello from app
    <ProductDetails
      productId={40344} //TODO: create state to control productId
    />
   <RelatedItems/>
    <QuestionsAndAnswers />
    <RatingsAndReviews
      productId={40344}/>
    </div>
  )
}

export default App;
