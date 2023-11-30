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
    <label style={{ fontSize: "0" }}>
      have a question? Search for answers
      <input
        className="qa-searchbar"
        style={{
          width: "100%",
          boxSizing: "border-box"
        }}
        placeholder="Have a question? Search for answers..."
        onChange={(e) => searchInputChangeHandler(e)}
      ></input>
    </label>
  );
};

export default Search;