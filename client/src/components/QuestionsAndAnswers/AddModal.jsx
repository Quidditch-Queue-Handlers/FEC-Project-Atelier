import React from 'react';

const AddModal = ({submitClickHandler, isQuestion}) => {
  const [responseTextInput, setResponseTextInput] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  //might need to change where this button lives depending on how a modal is created.
  return (
    <div>
      <div>AddModal</div>
      {isQuestion ? <button onClick={() => submitClickHandler()}>Add a Question +</button> : <button onClick={() => submitClickHandler()} style={{padding: 0, background: "none", border: "none", color: "blue", textDecoration: "underline", textTransform: "none" }}>Add Answer</button>}
    </div>
  );
};

export default AddModal;

//style={{padding: 0, background: "none", border: "none", color: "blue", textDecoration: "underline", textTransform: "none" }}