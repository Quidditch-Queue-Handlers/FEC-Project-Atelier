import React, { useState, useRef, useEffect } from "react";

const FillStar = ({ size = 24, star = 0, fillPerc = 0, ratingId, checked, handleChange }) => {

  const scale = size / 24;
  const pathPoints = [
    12, 2, 15.09, 8.26, 22, 9.27, 17, 14.14, 18.18, 21.02, 12, 17.77, 5.82,
    21.02, 7, 14.14, 2, 9.27, 8.91, 8.26, 12, 2,
  ];

  const starRadio = useRef(null);

  return (
    <div
      className="fill-star"
      style={handleChange ? {
        cursor: 'pointer'
      } : {}}
      onClick={() => {
        handleChange && starRadio?.current?.click();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 ${24 * scale} ${24 * scale}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2 * scale}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points={pathPoints.map(p => p * scale).join(" ")} />
      </svg>
      <span
        data-testid="star-fill-span"
        style={{
          height: size,
          width: `${fillPerc}%`,
          clipPath: `path('M${pathPoints.map(p => p * scale).join(" ")}z')`,
        }}
      ></span>
      <label htmlFor={`${ratingId}_${star}`} className="pd-visual-hidden">Star {star}</label>
      <input id={`${ratingId}_${star}`} ref={starRadio} type="radio" checked={checked} onChange={handleChange}  readOnly={handleChange ? false : true} value={star}/>
    </div>
  );
};

const ReviewStars = ({ rating, size = 13, ratingId, onRatingChange}) => {
  const [internalRating, setInternalRating] = useState(rating);

  useEffect(() => {
    onRatingChange && onRatingChange(internalRating)
  }, [internalRating])

  return (
    <div
      style={{
        display: "inline-flex",
        gap: `${size/8}px`,
      }}
    >
      {[...new Array(5)].map((_, i) => (
        <FillStar
          key={i}
          star={i + 1}
          ratingId={ratingId}
          size={size}
          checked={Math.floor(internalRating) === (i + 1)}
          fillPerc={
            internalRating >= i + 1
              ? 100
              : Math.ceil(internalRating) === i + 1
              ? (internalRating - i) * 100
              : 0
          }
          handleChange={onRatingChange ? (e) => {
            setInternalRating(+e.target.value)
          } : undefined}
        />
      ))}
    </div>
  );
};

export default ReviewStars;
