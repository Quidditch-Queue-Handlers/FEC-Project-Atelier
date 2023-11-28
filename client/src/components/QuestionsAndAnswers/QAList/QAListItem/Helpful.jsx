import React from 'react';

const Helpful = ({ helpfulCount, helpfulClickHandler }) => {
  const [alreadyClicked, setAlreadyClicked] = React.useState(false);

  return (
    <span>
      {` Helpful? `}
      <button
        style={{ padding: 0, background: "none", border: "none", color: "blue", textDecoration: "underline", textTransform: "none" }}
        onClick={() => {
          if (!alreadyClicked) {
            helpfulClickHandler();
            setAlreadyClicked(true);
          } else {
            console.log('Already Clicked!!');
          }
        }}
      >Yes</button>{`(${helpfulCount})   | `}
    </span>
  );
};

export default Helpful;