import React from 'react';
import AnswerList from './AnswerList';
import AddAnswer from './AddAnswer';
import Helpful from './Helpful';
import axios from 'axios';

const QAListItem = ({ question }) => {
  const [answerList, setAnswerList] = React.useState([]);
  const [displayedAnswerList, setDisplayedAnswerList] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(2);
  const [helpfulCount, setHelpfulCount] = React.useState(question?.question_helpfulness);
  const [submitTrigger, setSubmitTrigger] = React.useState(false);

  React.useEffect(() => {
    console.log('First A Render'); //yes i realize getting the first million if there were a million would not be best practice... but for this it seems okay to do for now.
    axios.get(`/qa/questions/${question?.question_id}/answers?count=1000000`)
      .then(({data}) => {
        var list = data.results;
        var sellerAnswers = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].answerer_name === 'Seller') {
            sellerAnswers.push(list[i]);
            list.splice(i, 1);
            i--;
          }
        }
        const sellerSortedList = [...sellerAnswers, ...list];
        //this is the end of the seller sorter area, i will move this out into its own helper function later.
        setAnswerList(sellerSortedList);
        setDisplayedAnswerList(sellerSortedList);
      })
      .catch((err) => console.error(`error getting answer list for question: ${question.question_id}, `, err));
  }, [submitTrigger]);

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
    axios.put(`/qa/questions/${question.question_id}/helpful`)
      .then( () => {setHelpfulCount(helpfulCount + 1)})
      .catch( (err) => console.error(`error incrementing helpfulness for question: ${question.question_id}, `, err));
  }

  const addAnswerClickHandler = (text, nickname, email, question_id) => {
    console.log('clicked add answer button');
    axios.post(`/qa/questions/${question_id}/answers`, {
      body: text,
      name: nickname,
      email: email
    })
      .then(() => console.log('successfully posted answer!'))
      .then(() => setSubmitTrigger(!submitTrigger))
      .catch((err) => console.error(`error posting answer: ${err}`));
    //using a console log for now but verified with postman that this request will work. will change to an axios post when the modal is fully implemented
  }

  const reportButtonClickHandler = (answerId) => {
    console.log('clicked report');
    //should only be able to report once!
    axios.put(`qa/answers/${answerId}/report`)
    // might need to kick off an axios call to rerender the list, but not in the BRD's
      .then(() => console.log('successfully reported'))
      .catch((err) => console.error(`error reporting andswer: ${answerId}, `, err));
  }


  return (
    <li>
      <div>QAListItem</div>
      <div>
        <b>{`Q: ${question.question_body}`}</b>
        <Helpful helpfulCount={helpfulCount} helpfulClickHandler={helpfulQuestionClickHandler} />
        <AddAnswer addAnswerClickHandler={addAnswerClickHandler} question_id={question?.question_id}/>
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