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
    console.log('clicked helpful on answer: ', answer?.answer_id);
    //should only be able to click once!
    axios.put(`/qa/answers/${answer.answer_id}/helpful`)
      .then( () => {setHelpfulCount(helpfulCount + 1)})
      .catch( (err) => console.error(`error incrementing helpfulness for question: ${question.question_id}`))
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
          reportButtonClickHandler(answer.answer_id);
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