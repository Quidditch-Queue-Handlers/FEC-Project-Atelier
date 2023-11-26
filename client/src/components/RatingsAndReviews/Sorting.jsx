import React, {useState, useEffect} from 'react';
import ReviewsList from "./ReviewsList"

const Sorting = () => {

  const [sort, setSort] = useState("relevance");

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