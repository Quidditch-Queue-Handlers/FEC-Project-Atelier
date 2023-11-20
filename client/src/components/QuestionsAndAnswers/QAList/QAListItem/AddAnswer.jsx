import React from 'react';
import AddModal from '../../AddModal';

const AddAnswer = ({addAnswerClickHandler}) => {
  const isQuestion = false; //this will never be changed

  return (
    <div>
      <div>AddAnswer</div>
      <AddModal submitClickHandler={addAnswerClickHandler} isQuestion={isQuestion}/>
    </div>

  );
};

export default AddAnswer;