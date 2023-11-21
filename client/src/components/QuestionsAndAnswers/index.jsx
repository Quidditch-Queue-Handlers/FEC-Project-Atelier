import React from 'react';
import AddQuestion from './AddQuestion';
import Search from './Search';
import QAList from './QAList';

const QuestionsAndAnswers = ({product_id}) => {
  const [questionsList, setQuestionsList] = React.useState([]);
  const [displayedQuestionsList, setDisplayedQuestionsList] = React.useState([]);
  React.useEffect(() => {
    console.log('First QA Render');
  }, []);
const loadMoreQuestionsClickHandler = () => {
  console.log('clicked Load more Questions!');
};
const searchButtonClickHandler = () => {
  console.log('clicked Search!');
};
const addQuestionClickHandler = () => {
  console.log('clicked Add a Question');
};

  return (
    <div>
      <h2>Questions and Answers</h2>
      <div>
        <Search searchButtonClickHandler={searchButtonClickHandler} />
        <QAList questionsList={questionsList} displayedQuestionsList={displayedQuestionsList} loadMoreQuestionsClickHandler={loadMoreQuestionsClickHandler} />
        <AddQuestion addQuestionClickHandler={addQuestionClickHandler} />
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
