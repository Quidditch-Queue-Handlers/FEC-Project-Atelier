import React, {useState, useEffect} from 'react';
import ReviewsList from "./ReviewsList"

const Sorting = ({sort, setSort}) => {

  return (
    <div>
      <label htmlFor="sortSelect"></label>
      <select id="sortSelect" value={sort} onChange={(event) => setSort(event.target.value)}>
        <option value="relevant">relevance</option>
        <option value="helpful">helpfulness</option>
        <option value="newest">newest</option>
      </select>
    </div>
  );
}

export default Sorting;