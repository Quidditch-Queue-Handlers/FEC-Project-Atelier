import React from 'react';

const Helpful = ({ helpfulCount, helpfulClickHandler }) => {
  const [alreadyClicked, setAlreadyClicked] = React.useState(false);

  return (
    <span>
      {` Helpful? `}
      <button
        className="qa-link-button"
        onClick={() => {
          if (!alreadyClicked) {
            helpfulClickHandler();
            setAlreadyClicked(true);
          }
        }}
      >Yes</button>{`(${helpfulCount})   | `}
    </span>
  );
};

export default Helpful;