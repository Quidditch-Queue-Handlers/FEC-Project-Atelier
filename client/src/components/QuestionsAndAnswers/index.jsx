import React from 'react';
import AddQuestion from './AddQuestion';
import Search from './Search';
import QAList from './QAList';
import exampleData from '../../../examples/QA-examples/exampleQuestionCall.json';

const QuestionsAndAnswers = ({product_id}) => {
  const [questionsList, setQuestionsList] = React.useState([]);
  const [displayedQuestionsList, setDisplayedQuestionsList] = React.useState([]);
  React.useEffect(() => {
    console.log('First QA Render');
    console.log(exampleData);
    setQuestionsList(exampleData.results);
    setDisplayedQuestionsList(exampleData.results);
  }, []);
const loadMoreQuestionsClickHandler = () => {
  console.log('clicked Load more Questions!');
};
const searchTextChangeHandler = (query) => {
  console.log(`Searching with query: ${query}!`);
  //need to set the
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
      <div>
        {questionsList.length !== 0 ? <Search searchTextChangeHandler={searchTextChangeHandler} /> : ""}
        {displayedQuestionsList.length !== 0 ? <QAList questionsList={questionsList} displayedQuestionsList={displayedQuestionsList} loadMoreQuestionsClickHandler={loadMoreQuestionsClickHandler} /> : ""}
        <AddQuestion addQuestionClickHandler={addQuestionClickHandler} />
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
