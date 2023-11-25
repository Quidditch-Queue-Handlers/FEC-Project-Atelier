import React from 'react';
import AnswerListItem from './AnswerListItem';

const AnswerList = ({ loadMoreAnswersClickHandler, displayedAnswerList, helpfulAnswerClickHandler, reportButtonClickHandler, displayCount }) => {
  const [isScrollable, setIsScrollable] = React.useState(false); //will change this when i am actually passing in valid data

  //need to check answer.answer_id to ensure the prop name is correct.
  return (
    <div>
      <div>AnswerList</div>
      <b>A:</b>
      <ul>
      {displayedAnswerList?.filter((answer, index) => index < displayCount)?.map((answer) => (
        <AnswerListItem
          answer={answer}
          key={answer?.answer_id}
          helpfulAnswerClickHandler={helpfulAnswerClickHandler}
          reportButtonClickHandler={reportButtonClickHandler}
        />
      ))}
      </ul>
      <button onClick={() => loadMoreAnswersClickHandler()}>Load More Answers</button>
    </div>
  );
};

export default AnswerList;