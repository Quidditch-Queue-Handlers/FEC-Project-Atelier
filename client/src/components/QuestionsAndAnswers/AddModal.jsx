import React from 'react';

const AddModal = ({ submitClickHandler, isQuestion, question_id, productName, questionBody }) => {
  const [body, setBody] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  //might need to change where this button lives depending on how a modal is created.
  //need two handlers, to open the modal and to close the modal.
  const regex = /^[\w-.]+@[\w-.]+\.[A-Za-z]{2,4}$/;
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const submitData = () => {
    if (body !== '' && nickname !== '' && email !== '') {
      if (regex.test(email)) {
        submitClickHandler(body, nickname, email, question_id);
        closeModal();
      } else {
        prompt("Invalid email", "please close this prompt and fix or click close button");
      }
    } else {
      prompt("One or more fields are empty!", "please close this prompt and fix or click close button");
    }
  }
  //document.body.style.overflow = "hidden" to stop scrolling
  return (
    <span position="relative" >
      {modalIsOpen ? (
        <>
          <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",

            height: "100%",
            background: "rgba(140, 140, 140, .8)",
            opacity: ".8",
            zIndex: "98"
          }}>
          </div>
          <div style={{
            position: "fixed",
            padding: "5vh",
            top: "25%",
            left: "25%",
            height: "auto",
            zIndex: "99",
            background: "white",
            opacity: "1",
            translate: "-50%, -50%"
          }}>
            <h3>{isQuestion ? ('Ask your Question') : ('Submit your Answer')}</h3>
            <h3>{isQuestion ? (`About the ${productName}`) : (`${productName}: ${questionBody}`)}</h3>
            <h4>{`Your ${isQuestion ? 'Question' : 'Answer'}*`}</h4>
            <textarea
              maxlength="1000"
              cols="48"
              rows="6"
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <h4>What is your nickname*</h4>
            <input
              maxlength="60"
              placeholder={'Example: jackson11!'}
              onChange={(e) => setNickname(e.target.value)}
            ></input>
            <p>For privacy reasons, do not use your full name or email address</p>
            <h4>Your email*</h4>
            <input
              maxlength="60"
              placeholder={'Example: jack@email.com'}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <p>For authentication reasons, you will not be emailed</p>
            <h4>{`Submit ${isQuestion ? 'Question' : 'Answer'}`}</h4>
            <button onClick={() => submitData()}>Submit</button>
            <button onClick={() => closeModal()}>Close</button>
          </div>
        </>
      ) : (
        null
      )}
      {isQuestion ? (
        <button
          onClick={() => openModal(isQuestion)}
        >Add a Question +</button>
      ) : (
        <button
          onClick={() => openModal(isQuestion)}
          style={{
            padding: 0,
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            textTransform: "none"
          }}
        >
          Add Answer
        </button>)}
    </span>
  );
};

export default AddModal;

//style={{padding: 0, background: "none", border: "none", color: "blue", textDecoration: "underline", textTransform: "none" }}

//for add question
//submitClickHandler(responseTextInput, nickname, email)

//for add answer
//submitClickHandler(responseTextInput, nickname, email, question_id)
