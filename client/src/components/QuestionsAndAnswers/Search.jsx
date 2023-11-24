import React from 'react';

const Search = ({searchTextChangeHandler}) => {
const [searchInputText, setSearchInputText] = React.useState('')

React.useEffect(() => {
  if (searchInputText.length > 2) {
    searchTextChangeHandler(searchInputText);
  } else {
    searchTextChangeHandler('');
  }
}, [searchInputText]);

const searchInputChangeHandler = (e) => {
  console.log(e.target.value);
  setSearchInputText(e.target.value);
}
  return (
    <div>
      <div>Search</div>
      <div>
        <input placeholder="Have a question? Search for answers..." onChange={(e) => searchInputChangeHandler(e)}></input>
      </div>
    </div>
  );
};

export default Search;