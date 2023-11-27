import React from 'react';

const AddModal = ({ submitClickHandler, isQuestion , question_id }) => {
  const [responseTextInput, setResponseTextInput] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  //might need to change where this button lives depending on how a modal is created.
  //need two handlers, to open the modal and to close the modal.

  return (
    <div>
      <div>AddModal</div>
      {isQuestion ? (
        <button
          onClick={() => submitClickHandler(responseTextInput, nickname, email)}
        >Add a Question +</button>
      ) : (
        <button
          onClick={() => submitClickHandler(responseTextInput, nickname, email, question_id)}
          style={{ padding: 0, background: "none", border: "none", color: "blue", textDecoration: "underline", textTransform: "none" }}
        >
          Add Answer
        </button>)}
    </div>
  );
};

export default AddModal;

//style={{padding: 0, background: "none", border: "none", color: "blue", textDecoration: "underline", textTransform: "none" }}