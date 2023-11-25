import React from 'react';
import QAListItem from './QAListItem';

const QAList = ({ questionsList, displayedQuestionsList, loadMoreQuestionsClickHandler, displayCount }) => {
  const [isScrollable, setIsScrollable] = React.useState(false); //will beter determine this when i implement the scrollbar

  //need to check question.question_id to ensure the prop name is correct.
  return (
    <div>
      <div>QAList</div>
      <ul>
        {displayedQuestionsList?.filter((question, index) => index < displayCount)?.map((question) => (
          <QAListItem question={question} key={question?.question_id} />
        ))}
      </ul>
      <button onClick={() => loadMoreQuestionsClickHandler()}>Load More Questions</button>
    </div>
  );
};

export default QAList;