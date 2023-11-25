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
      //but before i set the data i need to filter the answer list to raise the seller answers to the top AND to be sorted by helpfulness!
      //since it is an already sorted list can just iterate and when a Seller user is found it removes it from the data and pushes it to a new list. afterwards the two lists are joined back together.
    //also need to properly set the display count to be 0,1,or 2 correctly
    setAnswerList(example329065.results);
    setDisplayedAnswerList(example329065.results);
  }, []);

  const loadMoreAnswersClickHandler = (collapseList) => {
    console.log('clicked Load More Answers Button');
    if (!collapseList) {
      setDisplayCount(displayedAnswerList?.length);
    } else {
      setDisplayCount(2);
    }
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
        helpfulAnswerClickHandler={helpfulAnswerClickHandler}
        reportButtonClickHandler={reportButtonClickHandler}
      />
    </li>
  );
};

export default QAListItem;