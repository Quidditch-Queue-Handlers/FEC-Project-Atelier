import React from 'react';
import AddModal from './AddModal';

const AddQuestion = ({ addQuestionClickHandler, productName }) => {
  const isQuestion = true; //not a state because this never needs to change

  return (
    <AddModal
      submitClickHandler={addQuestionClickHandler}
      isQuestion={isQuestion}
      productName={productName}
    />
  );
};

export default AddQuestion;