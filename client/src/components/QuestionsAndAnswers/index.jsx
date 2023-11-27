import React from 'react';
import AddQuestion from './AddQuestion';
import Search from './Search';
import QAList from './QAList';
//going to leave this here until final cleanup
// import exampleData from '../../../examples/QA-examples/exampleQuestionCall.json';
import axios from 'axios';

const QuestionsAndAnswers = ({ product_id }) => {
  const [questionsList, setQuestionsList] = React.useState([]);
  const [displayedQuestionsList, setDisplayedQuestionsList] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(2);
  const [displayCollapse, setDisplayCollapse] = React.useState(false);
  const [productId, setproductId] = React.useState(product_id);

  React.useEffect(() => {
    console.log('First QA Render');
    //will change 40359 to product_id later
    axios.get(`/qa/questions?product_id=${'40359'}&count=1000000`)
      .then(({data}) => {
        setQuestionsList(data?.results);
        setDisplayedQuestionsList(data?.results);
      })
      .catch((err) => console.error(`questions get error for product: ${product_id}, `, err));
  }, []);

  const loadMoreQuestionsClickHandler = (collapseList) => {
    console.log('clicked Load more Questions!');
    if (collapseList) {
      setDisplayCount(2);
    } else {
      setDisplayCount(displayedQuestionsList.length);
    }
  };

  const searchTextChangeHandler = (query) => {
    console.log(`Searching with query: ${query}!`);
    var copyList = JSON.parse(JSON.stringify(questionsList));
    var newDisplayList = [];
    for (var i = 0; i < copyList.length; i++) {
      copyList[i]?.question_body?.includes(query) ? newDisplayList.push(copyList[i]) : copyList;
    }
    setDisplayedQuestionsList(newDisplayList);
  };

  const addQuestionClickHandler = (text, nickname, email) => {
    console.log('clicked Add a Question');
    console.log(`/qa/questions`, {
      body: text,
      name: nickname,
      email: email,
      product_id: productId
    });
    //using a console log for now but verified with postman that this request will work. will change to an axios post when the modal is fully implemented
  };

  return (
    <div>
      <h2>Questions and Answers</h2>
      <div >
        {questionsList.length !== 0 ? <Search searchTextChangeHandler={searchTextChangeHandler} /> : null}
        {displayedQuestionsList.length !== 0 ? (
          <QAList
            questionsList={questionsList}
            displayedQuestionsList={displayedQuestionsList}
            displayCount={displayCount}
          />
        ) : (
          null
        )}
        <div>
          {questionsList?.length === 0 ? (
            null
          ) : (
            <button
              onClick={() => {
                loadMoreQuestionsClickHandler(displayCollapse);
                setDisplayCollapse(!displayCollapse);
              }}
            >{displayCollapse ? 'Collapse Questions' : 'Load More Questions'}</button>
          )}
          <AddQuestion addQuestionClickHandler={addQuestionClickHandler}/>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;

//style={{overflowY:"auto", maxHeight: "100vh"}}