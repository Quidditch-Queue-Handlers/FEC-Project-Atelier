import React from 'react';

const Search = ({ searchTextChangeHandler }) => {
  const [searchInputText, setSearchInputText] = React.useState('')

  React.useEffect(() => {
    if (searchInputText.length > 2) {
      searchTextChangeHandler(searchInputText);
    } else {
      searchTextChangeHandler('');
    }
  }, [searchInputText]);

  const searchInputChangeHandler = (e) => {
    setSearchInputText(e.target.value);
  }
  return (
    <input
      className="qa-searchbar"
      style={{ width: "80%"}}
      placeholder="Have a question? Search for answers..."
      onChange={(e) => searchInputChangeHandler(e)}
    ></input>
  );
};

export default Search;