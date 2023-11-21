import React from 'react';

const ImageThumbnail = ({ src, alt, size = 5, round = false, children }) => {
  return (
    <div
      className="pd-thumbnails"
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      <span style={round ? { borderRadius: '50%' } : {}} >
        <img src={src} alt={alt} />
      </span>
      {children}
    </div>
  );
};

export default ImageThumbnail;
