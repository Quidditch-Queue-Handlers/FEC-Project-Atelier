import React from 'react';
import AnswerList from './AnswerList';
import AddAnswer from './AddAnswer';
import Helpful from './Helpful';

const QAListItem = ({question}) => {
  const [answerList, setAnswerList] = React.useState([]);
  const [displayedAnswerList, setDisplayedAnswerList] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(0);
  const [helpfulCount, setHelpfulCount] = React.useState(question?.question_helpfulness);

  React.useEffect(() => {
    console.log('First A Render')
    //set the answerList and displayedAnswerList on page load after an API call
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
    <div>
      <div>QAListItem</div>
      <div>
        <b>{`Q: ${question.question_body}`}</b>
        <Helpful helpfulCount={helpfulCount} helpfulClickHandler={helpfulQuestionClickHandler} />
        <AddAnswer addAnswerClickHandler={addAnswerClickHandler}/>
      </div>
      <AnswerList displayedAnswerList={displayedAnswerList} loadMoreAnswersClickHandler={loadMoreAnswersClickHandler} helpfulClickHandler={helpfulAnswerClickHandler} reportButtonClickHandler={reportButtonClickHandler}/>
    </div>
  );
};

export default QAListItem;