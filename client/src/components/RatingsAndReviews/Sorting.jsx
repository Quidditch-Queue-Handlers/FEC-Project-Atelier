import React, {useState, useEffect} from 'react';
import ReviewsList from "./ReviewsList"

const Sorting = () => {

  const [sort, setSort] = useState("relevance");

  const compare = (a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

  const handleSortChange = (sortOption) => {
    setCurrentSort(sortOption);
    if (currentSort === 'newest') {
      //do
    }
    else if (currentSort === 'helpfulness') {
      //do
    }
    else {
      //do
    }
  };

  useEffect(() => {
    console.log("sort:", sort)
  }, [sort])

  return (
    <>
    <select value={sort} onChange={(event) => setSort(event.target.value)}>
      <option value="relevance">relevance</option>
      <option value="helpfulness">helpfulness</option>
      <option value="newest">newest</option>
    </select>
    </>
  );
}

export default Sorting;