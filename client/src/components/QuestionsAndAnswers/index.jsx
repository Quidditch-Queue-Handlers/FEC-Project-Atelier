import React from 'react';
import AddQuestion from './AddQuestion';
import Search from './Search';
import QAList from './QAList';
import exampleData from '../../../examples/QA-examples/exampleQuestionCall.json';

const QuestionsAndAnswers = ({ product_id }) => {
  const [questionsList, setQuestionsList] = React.useState([]);
  const [displayedQuestionsList, setDisplayedQuestionsList] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(2);
  const [displayCollapse, setDisplayCollapse] = React.useState(false);
  React.useEffect(() => {
    console.log('First QA Render');
    console.log(exampleData);
    //update the initial display count to be 0,1,2 accordingly
    setQuestionsList(exampleData.results);
    setDisplayedQuestionsList(exampleData.results);
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
    console.log(copyList);
    console.log(displayedQuestionsList);
  };
  const addQuestionClickHandler = () => {
    console.log('clicked Add a Question');
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
          <AddQuestion addQuestionClickHandler={addQuestionClickHandler} />
        </div>
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;

//style={{overflowY:"auto", maxHeight: "100vh"}}