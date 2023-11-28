import React from 'react';
import QAListItem from './QAListItem';

const QAList = ({ questionsList, displayedQuestionsList, displayCount, productName }) => {
  const [isScrollable, setIsScrollable] = React.useState(false); //will beter determine this when i implement the scrollbar

  return (
    <div>
      <div>QAList</div>
      <ul style={{ overflowY: "auto", maxHeight: "70vh" }}>
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