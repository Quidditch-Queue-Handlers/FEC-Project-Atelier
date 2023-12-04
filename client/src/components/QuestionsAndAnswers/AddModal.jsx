import React from 'react';

const AddModal = ({ submitClickHandler, isQuestion, question_id, productName, questionBody }) => {
  const [body, setBody] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const regex = /^[\w-.]+@[\w-.]+\.[A-Za-z]{2,4}$/;

  const toggleModal = (input) => {
    setModalIsOpen(input);
  };
  const submitData = () => {
    if (body !== '' && nickname !== '' && email !== '') {
      if (regex.test(email)) {
        submitClickHandler(body, nickname, email, question_id);
        toggleModal(false);
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
          <div
          className="qa-modal-container"
          >
          </div>
          <div
          className="qa-modal"
          >
            <h3>{isQuestion ? ('Ask your Question') : ('Submit your Answer')}</h3>
            <h3>{isQuestion ? (`About the ${productName}`) : (`${productName}: ${questionBody}`)}</h3>
            <label >
              {`Your ${isQuestion ? 'Question' : 'Answer'}*`}
              <textarea
                maxLength="1000"
                cols="48"
                rows="6"
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </label>
            <label >
              What is your nickname*
              <input
                maxLength="60"
                placeholder={'Example: jackson11!'}
                onChange={(e) => setNickname(e.target.value)}
              ></input>
            </label>
            <p>For privacy reasons, do not use your full name or email address</p>
            <label >
              Your email*
              <input
                maxLength="60"
                placeholder={'Example: jack@email.com'}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>
            <p>For authentication reasons, you will not be emailed</p>
            <h4>{`Submit ${isQuestion ? 'Question' : 'Answer'}`}</h4>
            <button onClick={() => submitData()}>Submit</button>
            <button onClick={() => toggleModal(false)}>Close</button>
          </div>
        </>
      ) : (
        null
      )}
      {isQuestion ? (
        <button
          onClick={() => toggleModal(true)}
        >Add a Question +</button>
      ) : (
        <button
          onClick={() => toggleModal(true)}
          className="qa-link-button"
        >
          Add Answer
        </button>)}
    </span>
  );
};

export default AddModal;
