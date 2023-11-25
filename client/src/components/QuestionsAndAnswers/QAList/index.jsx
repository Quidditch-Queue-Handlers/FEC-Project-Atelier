import React from 'react';
import QAListItem from './QAListItem';

const QAList = ({ questionsList, displayedQuestionsList, loadMoreQuestionsClickHandler, displayCount }) => {
  const [isScrollable, setIsScrollable] = React.useState(false); //will beter determine this when i implement the scrollbar

  return (
    <div>
      <div>QAList</div>
      <ul>
        {displayedQuestionsList?.filter((question, index) => index < displayCount)?.map((question) => (
          <QAListItem question={question} key={question?.question_id} />
        ))}
      </ul>
      <button
        style={{position: "sticky", bottom: "0"}}
        onClick={() => loadMoreQuestionsClickHandler()}
      >Load More Questions</button>
    </div>
  );
};

export default QAList;