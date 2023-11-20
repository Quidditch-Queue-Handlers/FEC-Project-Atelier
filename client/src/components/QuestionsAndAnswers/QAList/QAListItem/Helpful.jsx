import React from 'react';

const Helpful = ({helpfulCount, helpfulClickHandler}) => {
  const [alreadyClicked, setAlreadyClicked] = React.useState(false);

  return (
    <div>
      <button onClick={() => {
        if(!alreadyClicked) {
          helpfulClickHandler();
          setAlreadyClicked(true);
        } else {
          console.log('Already Clicked!!');
        }
      }}>{`Helpful? Yes(${helpfulCount})`}</button>
    </div>
  );
};

export default Helpful;