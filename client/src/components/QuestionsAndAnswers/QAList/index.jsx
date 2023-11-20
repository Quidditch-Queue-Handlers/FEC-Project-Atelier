import React from 'react';
import QAListItem from './QAListItem';

const QAList = ({questionsList, displayedQuestionsList, loadMoreQuestionsClickHandler}) => {
  const[displayCount, setDisplayCount] = React.useState(displayedQuestionsList?.length); //might not need this state
  const[isScrollable, setIsScrollable] = React.useState(false); //will beter determine this when i implement the scrollbar

  //need to check question.question_id to ensure the prop name is correct.
  return (
    <div>
      <div>QAList</div>
      {questionsList?.map((question) => (
        <QAListItem question={question} key={question?.question_id}/>
      ))}
      <button onClick={() => loadMoreQuestionsClickHandler()}>Load More Questions</button>
    </div>
  );
};

export default QAList;