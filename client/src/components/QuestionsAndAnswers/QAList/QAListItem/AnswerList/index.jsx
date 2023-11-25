import React from 'react';
import AnswerListItem from './AnswerListItem';

const AnswerList = ({loadMoreAnswersClickHandler, displayedAnswerList, helpfulAnswerClickHandler, reportButtonClickHandler}) => {
const [isScrollable, setIsScrollable] = React.useState(false); //will change this when i am actually passing in valid data

//need to check answer.answer_id to ensure the prop name is correct.
  return (
    <div>
      <div>AnswerList</div>
      A:
      {displayedAnswerList?.map((answer) => (
        <AnswerListItem answer={answer} key={answer?.answer_id} helpfulAnswerClickHandler={helpfulAnswerClickHandler} reportButtonClickHandler={reportButtonClickHandler} />
      ))}
      <button onClick={() => loadMoreAnswersClickHandler()}>Load More Answers</button>
    </div>
  );
};

export default AnswerList;