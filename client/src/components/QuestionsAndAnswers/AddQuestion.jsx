import React from 'react';
import AddModal from './AddModal';

const AddQuestion = ({addQuestionClickHandler}) => {
  const isQuestion = true; //not a state because this never needs to change

  return (
    <AddModal submitClickHandler={addQuestionClickHandler} isQuestion={isQuestion} />
  );
};

export default AddQuestion;