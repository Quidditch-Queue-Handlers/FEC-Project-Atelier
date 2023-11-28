import React from 'react';
import AddModal from './AddModal';

const AddQuestion = ({ addQuestionClickHandler, productName }) => {
  const isQuestion = true;

  return (
    <AddModal
      submitClickHandler={addQuestionClickHandler}
      isQuestion={isQuestion}
      productName={productName}
    />
  );
};

export default AddQuestion;