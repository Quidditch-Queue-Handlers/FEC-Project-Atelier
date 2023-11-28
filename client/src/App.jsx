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
      productId={37311} //TODO: create state to control productId
    />
   <RelatedItems  productId={37311}/>
    <QuestionsAndAnswers />
    <RatingsAndReviews
      productId={37311}/>
    </div>
  )
}

export default App;
