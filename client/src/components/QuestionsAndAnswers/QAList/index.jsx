import React from 'react';
import QAListItem from './QAListItem';

const QAList = ({ questionsList, displayedQuestionsList, displayCount, productName }) => {

  return (
    <div>
      <ul
        className="qa-q-list"
      >
        {displayedQuestionsList?.filter((question, index) => index < displayCount)?.map((question) => (
          <QAListItem
            question={question}
            key={question?.question_id}
            productName={productName}
          />
        ))}
      </ul>
    </div>
  );
};

export default QAList;