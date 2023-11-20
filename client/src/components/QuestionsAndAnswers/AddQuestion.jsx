import React from 'react';
import AddModal from './AddModal';

const AddQuestion = ({addQuestionClickHandler}) => {
  const isQuestion = true; //not a state because this never needs to change

  return (
    <div>
      <div>AddQuestion</div>
    <AddModal submitClickHandler={addQuestionClickHandler} isQuestion={isQuestion}/>
    </div>
  );
};

export default AddQuestion;