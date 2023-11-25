import React from 'react';
import Helpful from '../Helpful';

const AnswerListItem = ({answer, helpfulAnswerClickHandler, reportButtonClickHandler}) => {
  const [alreadyReported, setAlreadyReported] = React.useState(false);
  const [helpfulCount, setHelpfulCount] = React.useState(answer?.helpfulCount);

  return (
    <li>
      <div>AnswerListItem</div>
      <Helpful helpfulCount={helpfulCount} helpfulClickHandler={helpfulAnswerClickHandler}/>
      <button onClick={() => {
        if(!alreadyReported) {
          reportButtonClickHandler();
          setAlreadyReported(true);
        } else {
          console.log('Already Reported!!');
        }
      }}>report</button>
    </li>
  );
};

export default AnswerListItem;