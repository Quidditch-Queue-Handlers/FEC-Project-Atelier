import React from 'react';
import QAListItem from './QAListItem';

const QAList = ({ questionsList, displayedQuestionsList, displayCount, productName }) => {

  return (
    <div>
      <ul
        className="qa-q-list"
      >
        {displayedQuestionsList?.filter((question, index) => index < displayCount)?.map((question) => {
          var answers = [];
          for (var key in question.answers) {
            var current = question?.answers[key];
            if (answers.length === 0) {
              answers.push(current);
            } else {
              for (var i = 0; i < answers.length; i++) {
                if (current.helpfulness > answers[i].helpfulness) {
                  i === 0 ? answers.unshift(current) : answers.splice(i, 0, current);
                  break;
                } else if (i === answers.length - 1) {
                  answers.push(current);
                  break;
                }
              }
            }
          }
          return (
          <QAListItem
            question={question}
            key={question?.question_id}
            productName={productName}
            answers={answers}
          />
        )})}
      </ul>
    </div>
  );
};

export default QAList;