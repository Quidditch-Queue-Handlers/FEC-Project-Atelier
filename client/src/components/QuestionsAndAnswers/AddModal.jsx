import React from 'react';

const AddModal = ({submitClickHandler, isQuestion}) => {
  const [responseTextInput, setResponseTextInput] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  //might need to change where this button lives depending on how a modal is created.
  return (
    <div>
      <div>AddModal</div>
      <button onClick={() => submitClickHandler()}>Add a ___ +</button>
    </div>
  );
};

export default AddModal;