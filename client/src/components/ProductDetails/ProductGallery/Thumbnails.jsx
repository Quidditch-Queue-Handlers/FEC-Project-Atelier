import React, { useState, useEffect } from 'react';
import ImageThumbnail from '../shared/ImageThumbnail'

const LIMIT_DISPLAY = 5;
const THUMB_SIZE = 5;
const MARGIN_SIZE = 2;

const Thumbnails = ({ photos, photoIndex, setPhotoIndex, styleName }) => {

  const [offset, setOffset] = useState(0);

  const handleThumbSelectChange = (i) => {
    setPhotoIndex(i);
  }

  useEffect(() => {
    //Logic for sliding window
    //if outside of window, shift offset
    if ((photoIndex + 1) > LIMIT_DISPLAY) {
      setOffset(
        //shift offset by remainder
        (photoIndex + 1) % LIMIT_DISPLAY +
        //plus any multiples past the first window
        Math.max((LIMIT_DISPLAY * Math.floor((photoIndex + 1) / LIMIT_DISPLAY)) - LIMIT_DISPLAY, 0)
        //and center the selected thumbnail if isn't last
        + (photoIndex !== photos.length - 1 ? 1 : 0))
    } else {
      setOffset(0)
    }

  }, [photos, photoIndex, offset])

  const height = (LIMIT_DISPLAY * THUMB_SIZE) + ((LIMIT_DISPLAY - 1) * MARGIN_SIZE);

  return (
    <div
      style={{ height: `${height}rem`, overflow: 'hidden', margin: '2rem' }}
    >
      <div
        className="pd-carousel-thumbnails"
        style={{ transform: `translateY(${-offset * (THUMB_SIZE + MARGIN_SIZE)}rem`, gap: `${MARGIN_SIZE}rem` }}
      >
        {photos?.map((photo, i) =>
          <div
            key={photo.thumbnail_url}
            onClick={(e) => {
              e.stopPropagation();
              handleThumbSelectChange(i)
            }}
          >
            <ImageThumbnail
              src={photo.thumbnail_url}
              alt={`${styleName} preview ${i + 1} / ${photos?.length}`}
              size={THUMB_SIZE}
            >
              <label
                style={{ display: 'none' }}
                htmlFor={`${styleName}_preview_${i}`}
              >
                {`${styleName} preview ${i + 1} / ${photos?.length}`}
              </label>
              <input
                style={{ appearance: 'none' }}
                id={`${styleName}_preview_${i}`}
                type="radio"
                value={i}
                checked={i === photoIndex}
                onChange={(event) => {
                  handleThumbSelectChange(+event.target.value);
                }}
              />
            </ImageThumbnail>
          </div>
        )}
      </div>
    </div>

  );
}

export default Thumbnails;
