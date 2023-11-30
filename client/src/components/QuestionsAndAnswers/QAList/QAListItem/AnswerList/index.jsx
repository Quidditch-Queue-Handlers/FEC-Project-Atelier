import React from 'react';
import AnswerListItem from './AnswerListItem';

const AnswerList = ({ loadMoreAnswersClickHandler, displayedAnswerList, reportButtonClickHandler, displayCount }) => {
  const [displayCollapse, setDisplayCollapse] = React.useState(false);

  return (
    <div>
      {displayedAnswerList?.length === 0 ? null : (<b>A:</b>)}
      <ul style={{overflowY: "auto", maxHeight: "50vh"}}>
        {displayedAnswerList?.filter((answer, index) => index < displayCount)?.map((answer) => (
          <AnswerListItem
            answer={answer}
            key={answer?.answer_id}
            reportButtonClickHandler={reportButtonClickHandler}
          />
        ))}
      </ul>
      {displayedAnswerList?.length < 3 ? null : (<button
        onClick={() => {
          loadMoreAnswersClickHandler(displayCollapse);
          setDisplayCollapse(!displayCollapse);
        }}
        style={{ padding: 0, background: "none", border: "none", color: "blue", textDecoration: "underline", textTransform: "none" }}
      >{displayCollapse ? 'Collapse Answers' : 'Load More Answers' }</button>)}
    </div>
  );
};

export default AnswerList;