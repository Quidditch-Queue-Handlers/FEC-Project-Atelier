import React from 'react';
import AddModal from '../../AddModal';

const AddAnswer = ({ addAnswerClickHandler, question_id, questionBody, productName }) => {
  const isQuestion = false; //this will never be changed

  return (
    <div>
      <div>AddAnswer</div>
      <AddModal
        submitClickHandler={addAnswerClickHandler}
        isQuestion={isQuestion}
        question_id={question_id}
        productName={productName}
        questionBody={questionBody}
      />
    </div>

  );
};

export default AddAnswer;