import React from 'react';
import Helpful from '../Helpful';
import { parseISO } from 'date-fns';

const AnswerListItem = ({ answer, helpfulAnswerClickHandler, reportButtonClickHandler }) => {
  const [alreadyReported, setAlreadyReported] = React.useState(false);
  const [helpfulCount, setHelpfulCount] = React.useState(answer?.helpfulness);

  //options object to format my date properly
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric"
  }

  return (
    <li>
      <div>{`${answer.body}`}</div>
      {answer.answerer_name === 'Seller' ? (
        <p>by <b>{answer.answerer_name}</b>, {parseISO(answer.date).toLocaleDateString("en-US", options)} |</p>
      ): (
        <p>{`by ${answer.answerer_name}, ${parseISO(answer.date).toLocaleDateString("en-US", options)}`} |</p>
        )}
      <Helpful helpfulCount={helpfulCount} helpfulClickHandler={helpfulAnswerClickHandler} />
      <button onClick={() => {
        if (!alreadyReported) {
          reportButtonClickHandler();
          setAlreadyReported(true);
        } else {
          console.log('Already Reported!!');
        }
      }}
        style={{ padding: 0, background: "none", border: "none", color: "blue", textDecoration: "underline", textTransform: "none" }}
      >report</button>
    </li>
  );
};

export default AnswerListItem;