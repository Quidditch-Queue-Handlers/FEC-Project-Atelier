import React from 'react';

const Carousel = ({ photoIndex, photos, setPhotoIndex }) => {
  return (
    <div className='pd-carousel-main'>
      {photoIndex > 0 &&
        <button
          style={{ left: '1rem', transform: 'scaleX(-1) translateY(-50%)' }}
          onClick={(e) => {
            e.stopPropagation();
            setPhotoIndex(i => i - 1)
          }}
        >
            &#x279C;
        </button>
      }
      <span >
        <img
          src={photos?.[photoIndex]?.url} />
      </span>
      {photoIndex < photos?.length - 1 &&
        <button
          style={{ right: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            setPhotoIndex(i => i + 1)
          }}
        >
            &#x279C;
        </button>
      }
    </div>
  );
}

export default Carousel;
