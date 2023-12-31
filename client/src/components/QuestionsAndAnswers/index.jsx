import React from 'react';
import AddQuestion from './AddQuestion';
import Search from './Search';
import QAList from './QAList';
import axios from 'axios';

const QuestionsAndAnswers = ({ product_id }) => {
  const [questionsList, setQuestionsList] = React.useState([]);
  const [displayedQuestionsList, setDisplayedQuestionsList] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(2);
  const [displayCollapse, setDisplayCollapse] = React.useState(false);
  const [productId, setproductId] = React.useState(product_id);
  const [productName, setProductName] = React.useState('');
  const [searchInputText, setSearchInputText] = React.useState('');

  React.useEffect(() => {
    axios.get(`/qa/questions?product_id=${product_id}&count=1000000000`)
      .then(({ data }) => {
        setQuestionsList(data?.results);
        setDisplayedQuestionsList(data?.results);
      })
      .then(() => {
        axios.get(`/products/${productId}`)
          .then(({ data }) => setProductName(data?.name))
          .catch((err) => console.error(`products get error for product ${product_id}, `, err));
      })
      .catch((err) => console.error(`questions get error for product: ${product_id}, `, err));
  }, []);

  React.useEffect(() => {
    searchTextChangeHandler(searchInputText);
  }, [questionsList]);

  const loadMoreQuestionsClickHandler = (collapseList) => {
    if (collapseList) {
      setDisplayCount(2);
    } else {
      setDisplayCount(displayedQuestionsList.length);
    }
  };

  const searchTextChangeHandler = (query) => {
    var copyList = JSON.parse(JSON.stringify(questionsList));
    var newDisplayList = [];
    for (var i = 0; i < copyList.length; i++) {
      copyList[i]?.question_body?.includes(query) ? newDisplayList.push(copyList[i]) : copyList;
    }
    setDisplayedQuestionsList(newDisplayList);
  };

  const searchInputChangeHandler = (e) => {
    setSearchInputText(e.target.value);
  }

  const addQuestionClickHandler = (text, nickname, email) => {
    axios.post(`/qa/questions`, {
      body: text,
      name: nickname,
      email: email,
      product_id: productId
    })
      .then(() => {
        axios.get(`/qa/questions?product_id=${product_id}&count=1000000000`)
          .then(({ data }) => {
            setQuestionsList(data?.results);
          })
          .then(() => {
            axios.get(`/products/${productId}`)
              .then(({ data }) => setProductName(data?.name))
              .catch((err) => console.error(`products get error for product ${product_id}, `, err));
          })
          .catch((err) => console.error(`questions get error for product: ${product_id}, `, err));
      })
      .catch((err) => console.error(`error posting question: ${err}`));
  };

  return (
    <div className="qa-container" >
      <h2>Questions and Answers</h2>
      <div>
        {questionsList.length !== 0 ? (
          <Search
            searchTextChangeHandler={searchTextChangeHandler}
            searchInputChangeHandler={searchInputChangeHandler}
            searchInputText={searchInputText}
          />
        ) : (
          null
        )}
        {displayedQuestionsList.length !== 0 ? (
          <QAList
            questionsList={questionsList}
            displayedQuestionsList={displayedQuestionsList}
            displayCount={displayCount}
            productName={productName}
          />
        ) : (
          null
        )}
        <div>
          {questionsList?.length < 3 ? (
            null
          ) : (
            <button
              onClick={() => {
                loadMoreQuestionsClickHandler(displayCollapse);
                setDisplayCollapse(!displayCollapse);
              }}
            >{displayCollapse ? 'Collapse Questions' : 'Load More Questions'}</button>
          )}
          <AddQuestion
            addQuestionClickHandler={addQuestionClickHandler}
            productName={productName}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
