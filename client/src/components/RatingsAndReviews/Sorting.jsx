import React, {useState, useEffect} from 'react';
import ReviewsList from "./ReviewsList"

const Sorting = () => {

  const [sort, setSort] = useState("relevant");

  useEffect(() => {
    // do stuff
  }, [sort])

  return (
    <>
    <select value={sort} onChange={(event) => setSort(event.target.value)}>
      <option value="relevant">relevant</option>
      <option value="helpful">helpful</option>
      <option value="newest">newest</option>
    </select>
    </>
  );
}

export default Sorting;