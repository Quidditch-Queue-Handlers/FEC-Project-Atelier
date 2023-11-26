import React, { useState, useEffect } from 'react';
import ImageThumbnail from '../shared/ImageThumbnail';

const LIMIT_DISPLAY = 5;
const THUMB_SIZE = 5;
const MARGIN_SIZE = 2;

const Thumbnails = ({ photos, photoIndex, setPhotoIndex, styleName }) => {
  const [offset, setOffset] = useState(0);

  const handleThumbSelectChange = (i) => {
    const selectedRadio = document.getElementById(`${styleName}_preview_${i}`);
    selectedRadio?.focus();
    setPhotoIndex(i);
  };

  useEffect(() => {
    //Logic for sliding window
    //if outside of window, shift offset
    if (photoIndex + 1 > LIMIT_DISPLAY) {
      setOffset(
        //shift offset by remainder
        ((photoIndex + 1) % LIMIT_DISPLAY) +
          //plus any multiples past the first window
          Math.max(
            LIMIT_DISPLAY * Math.floor((photoIndex + 1) / LIMIT_DISPLAY) -
              LIMIT_DISPLAY,
            0
          ) 
      );
    } else {
      setOffset(0);
    }
  }, [photos, photoIndex]);

  const height = LIMIT_DISPLAY * THUMB_SIZE + LIMIT_DISPLAY * MARGIN_SIZE;
  const maxOffset = photos?.length > LIMIT_DISPLAY ? Math.ceil(photos?.length - LIMIT_DISPLAY) : 0;

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          height: `${height - (offset > 0 ? THUMB_SIZE + MARGIN_SIZE : 0)}rem`,
          //no separate marginTop because React render warning
          margin: `${
            MARGIN_SIZE + (offset > 0 ? THUMB_SIZE + MARGIN_SIZE : 0)
          }rem ${MARGIN_SIZE}rem ${MARGIN_SIZE}rem ${MARGIN_SIZE}rem`,
          overflow: 'clip',
        }}
      >
        <div
          className='pd-carousel-thumbnails'
          style={{
            transform: `translateY(${
              -offset * (THUMB_SIZE + MARGIN_SIZE) -
              (offset > 0 ? THUMB_SIZE + MARGIN_SIZE : 0)
            }rem`,
            gap: `${MARGIN_SIZE}rem`,
          }}
        >
          {photos?.map((photo, i) => (
            <div
              key={photo.thumbnail_url + i}
              onClick={(e) => {
                e.stopPropagation();
                handleThumbSelectChange(i);
              }}
            >
              <ImageThumbnail
                src={photo.thumbnail_url}
                alt={`${styleName} preview ${i + 1} / ${photos?.length}`}
                size={THUMB_SIZE}
              >
                <label
                  className='pd-visual-hidden'
                  htmlFor={`${styleName}_preview_${i}`}
                >
                  {`${styleName} preview ${i + 1} / ${photos?.length}`}
                </label>
                <input
                  id={`${styleName}_preview_${i}`}
                  type='radio'
                  value={i}
                  checked={i === photoIndex}
                  onChange={(event) => {
                    handleThumbSelectChange(+event.target.value);
                  }}
                />
              </ImageThumbnail>
            </div>
          ))}
        </div>
      </div>
      {(offset > 0) && (
        <button
          style={{
            transform: `translateX(-50%) translateY(calc(${THUMB_SIZE}rem - 25%)) rotate(-90deg)`,
            height: `${THUMB_SIZE}rem`,
            left: '50%',
            top: 0,
            borderRadius: 0,
            fontSize: '1.5rem',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOffset((o) => o - 1);
          }}
        >
          <span
            style={{ transform: `translateY(-7%)` }}
          >
            &rsaquo;
          </span>
        </button>
      )}
      {offset < maxOffset && (
        <button
          style={{
            transform: `translateX(-50%) translateY(calc(${
              height
            }rem)) rotate(90deg)`,
            height: `${THUMB_SIZE}rem`,
            left: '50%',
            top: 0,
            borderRadius: 0,
            fontSize: '1.5rem',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOffset((o) => o + 1);
          }}
        >
          <span
            style={{ transform: `translateY(-7%)` }}
          >
            &rsaquo;
          </span>
        </button>
      )}
    </div>
  );
};

export default Thumbnails;
