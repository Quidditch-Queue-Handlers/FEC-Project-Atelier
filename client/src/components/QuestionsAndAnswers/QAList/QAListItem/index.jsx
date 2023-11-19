import React from 'react';
import AnswerList from './AnswerList';
import AddAnswer from './AddAnswer';
import Helpful from './Helpful';

const QAListItem = () => {

  return (
    <div>
      <div>QAListItem</div>
      <div>
        Q:
        <Helpful />
        <AddAnswer />
      </div>
      <AnswerList />
    </div>
  );
};

export default QAListItem;