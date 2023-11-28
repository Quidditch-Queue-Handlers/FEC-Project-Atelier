import React from 'react';
import AddModal from '../../AddModal';

const AddAnswer = ({ addAnswerClickHandler, question_id, questionBody, productName }) => {
  const isQuestion = false;

  return (
      <AddModal
        submitClickHandler={addAnswerClickHandler}
        isQuestion={isQuestion}
        question_id={question_id}
        productName={productName}
        questionBody={questionBody}
      />
  );
};

export default AddAnswer;