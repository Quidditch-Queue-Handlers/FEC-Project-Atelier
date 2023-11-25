import React from 'react';
import AnswerList from './AnswerList';
import AddAnswer from './AddAnswer';
import Helpful from './Helpful';
import example329062 from '../../../../../examples/QA-examples/exampleAnswer329062.json';
import example329065 from '../../../../../examples/QA-examples/exampleAnswer329065.json';
import example329066 from '../../../../../examples/QA-examples/exampleAnswer329066.json';
import example329068 from '../../../../../examples/QA-examples/exampleAnswer329068.json';
import example329069 from '../../../../../examples/QA-examples/exampleAnswer329069.json';

const QAListItem = ({ question }) => {
  const [answerList, setAnswerList] = React.useState([]);
  const [displayedAnswerList, setDisplayedAnswerList] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(2);
  const [helpfulCount, setHelpfulCount] = React.useState(question?.question_helpfulness);

  React.useEffect(() => {
    console.log('First A Render')
    //set the answerList and displayedAnswerList on page load after an API call
    //also need to properly set the display count to be 0,1,or 2 correctly
    setAnswerList(example329065.results);
    setDisplayedAnswerList(example329065.results);
  }, []);

  const loadMoreAnswersClickHandler = () => {
    console.log('clicked Load More Answers Button');
    //need to add logic for doing something different depending on the text displayed by the button.
  };

  const helpfulQuestionClickHandler = () => {
    console.log('clicked helpful on a question');
    //should only be able to click once!
  }

  const helpfulAnswerClickHandler = () => {
    console.log('clicked helpful on an answer');
    //should only be able to click once!
  }

  const addAnswerClickHandler = () => {
    console.log('clicked add answer button');
  }

  const reportButtonClickHandler = () => {
    console.log('clicked report');
    //should only be able to report once!
  }


  return (
    <li>
      <div>QAListItem</div>
      <div>
        <b>{`Q: ${question.question_body}`}</b>
        <Helpful helpfulCount={helpfulCount} helpfulClickHandler={helpfulQuestionClickHandler} />
        <AddAnswer addAnswerClickHandler={addAnswerClickHandler} />
      </div>
      <AnswerList
        question={question}
        displayedAnswerList={displayedAnswerList}
        displayCount={displayCount}
        loadMoreAnswersClickHandler={loadMoreAnswersClickHandler}
        helpfulClickHandler={helpfulAnswerClickHandler}
        reportButtonClickHandler={reportButtonClickHandler}
      />
    </li>
  );
};

export default QAListItem;