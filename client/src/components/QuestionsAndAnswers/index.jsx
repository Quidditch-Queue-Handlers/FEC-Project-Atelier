import React from 'react';
import AddQuestion from './AddQuestion';
import Search from './Search';
import QAList from './QAList';

const QuestionsAndAnswers = () => {

  return (
    <div>
      <h2>Questions and Answers</h2>
      <div>
        <Search />
        <QAList />
        <AddQuestion />
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
