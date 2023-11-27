import React from 'react';
import AnswerList from './AnswerList';
import AddAnswer from './AddAnswer';
import Helpful from './Helpful';
import axios from 'axios';
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
    console.log('First A Render'); //yes i realize getting the first million if there were a million would not be best practice... but for this it seems okay to do for now.
    axios.get(`/qa/questions/${question?.question_id}/answers?count=1000000`)
      .then(({data}) => {
        //this sorts the list so that the seller answers appear at the top of the list in order of helpfulness, able to be done this way because the list comes sorted by helpfulness from the API call.
        var list = JSON.parse(JSON.stringify(data.results));
        var sellerAnswers = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].answerer_name === 'Seller') {
            sellerAnswers.push(list[i]);
            list.splice(i, 1);
            i--;
          }
        }
        const sellerSortedList = [...sellerAnswers, ...data];
        //this is the end of the seller sorter area, i will move this out into its own helper function later.
        setAnswerList(sellerSortedList);
        setDisplayedAnswerList(sellerSortedList);
      })
      .catch((err) => console.error(`error getting answer list for question: ${question.question_id}`))
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
    console.log('clicked helpful on question: ', question.question_id);
    //should only be able to click once!
            // /qa/questions/329069/helpful
    axios.put(`/qa/questions/${question.question_id}/helpful`)
      .then( () => {setHelpfulCount(helpfulCount + 1)})
      .catch( (err) => console.error(`error incrementing helpfulness for question: ${question.question_id}`))
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
        reportButtonClickHandler={reportButtonClickHandler}
      />
    </li>
  );
};

export default QAListItem;