import React from 'react';
import AnswerListItem from './AnswerListItem';

const AnswerList = () => {

  return (
    <div>
      <div>AnswerList</div>
      A:
      <AnswerListItem />
      <button>Load More Answers</button>
    </div>
  );
};

export default AnswerList;