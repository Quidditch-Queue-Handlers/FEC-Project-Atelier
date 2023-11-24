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

//will need to remove the button since the filter is kicked off automatically under different conditions, for now will keep there to test
  return (
    <div>
      <div>Search</div>
      <div>
        <input placeholder="Have a question? Search for answers..." onChange={(e) => searchInputChangeHandler(e)}></input>
        {/* <button onClick={() => searchButtonClickHandler(searchInputText)}> Search</button> */}
      </div>
    </div>
  );
};

export default Search;