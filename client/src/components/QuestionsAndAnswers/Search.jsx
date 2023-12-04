import React from 'react';

const Search = ({ searchTextChangeHandler, searchInputText, searchInputChangeHandler}) => {

  React.useEffect(() => {
    if (searchInputText?.length > 2) {
      searchTextChangeHandler(searchInputText);
    } else {
      searchTextChangeHandler('');
    }
  }, [searchInputText]);

  return (
    <label style={{ fontSize: "0" }}>
      have a question? Search for answers
      <input
        className="qa-searchbar"
        placeholder="Have a question? Search for answers..."
        onChange={(e) => searchInputChangeHandler(e)}
      ></input>
    </label>
  );
};

export default Search;