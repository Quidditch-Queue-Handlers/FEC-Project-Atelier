import React from 'react';
import AnswerList from './AnswerList';
import AddAnswer from './AddAnswer';
import Helpful from './Helpful';
import axios from 'axios';

const QAListItem = ({ question, productName }) => {
  const [answerList, setAnswerList] = React.useState([]);
  const [displayedAnswerList, setDisplayedAnswerList] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(2);
  const [helpfulCount, setHelpfulCount] = React.useState(question?.question_helpfulness);
  const [submitTrigger, setSubmitTrigger] = React.useState(false);
  const [questionBody, setQuestionBody] = React.useState('');

  React.useEffect(() => {
    //yes i realize getting the first million if there were a million would not be best practice... but for now this it seems okay to do. also might do a multi stage axios call in order to get initial display data loaded faster (have count for both questions/answers first call be limited to 2 and when those calls are successfull then() do a second call to get the whole lists).
    axios.get(`/qa/questions/${question?.question_id}/answers?count=1000000`)
      .then(({ data }) => {
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
        //this is the end of the seller sorter area, i might move this out into its own helper function later.
        setQuestionBody(question?.question_body);
        setAnswerList(sellerSortedList);
        setDisplayedAnswerList(sellerSortedList);
      })
      .catch((err) => console.error(`error getting answer list for question: ${question.question_id}, `, err));
  }, [submitTrigger]);

  const loadMoreAnswersClickHandler = (collapseList) => {
    if (!collapseList) {
      setDisplayCount(displayedAnswerList?.length);
    } else {
      setDisplayCount(2);
    }
  };

  const helpfulQuestionClickHandler = () => {
    axios.put(`/qa/questions/${question.question_id}/helpful`)
      .then(() => { setHelpfulCount(helpfulCount + 1) })
      .catch((err) => console.error(`error incrementing helpfulness for question: ${question.question_id}, `, err));
  }

  const addAnswerClickHandler = (text, nickname, email, question_id) => {
    axios.post(`/qa/questions/${question_id}/answers`, {
      body: text,
      name: nickname,
      email: email
    })
      .then(() => setSubmitTrigger(!submitTrigger))
      .catch((err) => console.error(`error posting answer: ${err}`));
  }

  const reportButtonClickHandler = (answerId) => {
    axios.put(`qa/answers/${answerId}/report`)
      // might want to kick off an axios call to rerender the list, but not in the BRD's
      .catch((err) => console.error(`error reporting andswer: ${answerId}, `, err));
  }


  return (
    <li>
      <div style={{display:"flex", padding: "1% 0"}}>
        <b>{`Q: ${question.question_body}`}</b>
        <span style={{ marginLeft:"auto"}}>
          <Helpful
            helpfulCount={helpfulCount}
            helpfulClickHandler={helpfulQuestionClickHandler}
          />
          <AddAnswer
            addAnswerClickHandler={addAnswerClickHandler}
            question_id={question?.question_id}
            productName={productName}
            questionBody={questionBody}
          />
        </span>
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