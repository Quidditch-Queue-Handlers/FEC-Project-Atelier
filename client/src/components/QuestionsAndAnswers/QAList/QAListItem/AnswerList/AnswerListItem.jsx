import React from 'react';
import Helpful from '../Helpful';
import { parseISO } from 'date-fns';
import axios from 'axios';

const AnswerListItem = ({ answer, reportButtonClickHandler }) => {
  const [alreadyReported, setAlreadyReported] = React.useState(false);
  const [helpfulCount, setHelpfulCount] = React.useState(answer?.helpfulness);

  //options object to format my date properly
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric"
  }
  const helpfulAnswerClickHandler = () => {
    axios.put(`/qa/answers/${answer.answer_id}/helpful`)
      .then(() => { setHelpfulCount(helpfulCount + 1) })
      .catch((err) => console.error(`error incrementing helpfulness for question: ${question.question_id}, `, err));
  }

  return (
    <li
      className="qa-a-list-item"
    >
      <div>{`${answer.body}`}</div>
      {answer.answerer_name === 'Seller' ? (
        <span>by <b>{answer.answerer_name}</b>, {parseISO(answer.date).toLocaleDateString("en-US", options)} |</span>
      ) : (
        <span>{`by ${answer.answerer_name}, ${parseISO(answer.date).toLocaleDateString("en-US", options)}`} |</span>
      )}
      <Helpful
        helpfulCount={helpfulCount}
        helpfulClickHandler={helpfulAnswerClickHandler}
      />
      <button
        className="qa-link-button"
        onClick={() => {
          if (!alreadyReported) {
            reportButtonClickHandler(answer.answer_id);
            setAlreadyReported(true);
          }
        }}
      >
        {!alreadyReported ? ('report') : ('reported')}
      </button>
    </li>
  );
};

export default AnswerListItem;