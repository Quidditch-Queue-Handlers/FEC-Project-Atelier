import React, { useEffect, useState, useCallback, useRef } from 'react';

const ZOOM_SCALE = 2.5; 

const Carousel = ({
  photoIndex,
  photos,
  setPhotoIndex,
  styleName,
  expanded,
  setExpanded,
  zoomed,
  setZoomed,
  containerRef
}) => {
  const imgRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const calculateTransformPosition = useCallback((clickEvent) => {
    const containerBox = containerRef?.current?.getBoundingClientRect();
    const {naturalWidth, naturalHeight} = imgRef?.current || {};
    const { top, left, width, height } = containerBox || {};

    /* 
      The zoomed image height at most is the height of the container * ZOOM_SCALE, otherwise
      if the image does not take full height of the container (in the case that it 
      is constrained by its width), it is the its scaled height * ZOOM_SALE 
    */
    const zoomedImageHeight = Math.min(height * ZOOM_SCALE, (width / naturalWidth) * naturalHeight * ZOOM_SCALE);
    const zoomedImageWidth = (height / naturalHeight) * naturalWidth * ZOOM_SCALE;
    /* 
      Calculate the maximum translation bounds, x and y, based on the width & height of 
      the container and width height of zoomedImage. 
      The result needs to be scaled down by the zoom_scale because a movement of 1px
      would result in a translation of (1 * ZOOM_SCALE)px. 
    */
    const maxX = Math.abs((width - zoomedImageWidth) / 2 / ZOOM_SCALE);
    const maxY = Math.abs((height - zoomedImageHeight) / 2 / ZOOM_SCALE);

    if(clickEvent) {
      onMouseMove(clickEvent)
    }

    function onMouseMove(mouseMoveEvent) {
      const x = mouseMoveEvent.clientX;
      const y = mouseMoveEvent.clientY;
      //calculate mouse X, Y position relative to parent container
      const xPercent = Math.min(1, Math.max((x - left) / width, 0));
      const yPercent = Math.min(1, Math.max((y - top) / height, 0));
      //set translate from -maxX to +maxX, linearly relative to xPercent
      setTranslateX(xPercent * maxX * 2 - maxX);
      //same idea for y
      setTranslateY(-1 * (yPercent * maxY * 2 - maxY));
    };

    return onMouseMove
  }, [zoomed, photoIndex, photos]);

  useEffect(() => {
    const onMouseMove = calculateTransformPosition();
    if (zoomed) {
      window.addEventListener('mousemove', onMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [zoomed, photoIndex, photos]);

  return (
    <div
      className='pd-carousel-main'
      style={
        expanded && !zoomed
          ? { cursor: 'crosshair' }
          : expanded
          ? { cursor: 'zoom-out' }
          : { cursor: 'zoom-in' }
      }
      onClick={(e) => {
        if (!expanded) {
          setExpanded(true); 
        }
        else if (expanded && !zoomed) {
          setZoomed(true); 
          calculateTransformPosition(e);
        } else if (expanded) {
          setZoomed(false); 
        }
      }}
    >
      {photoIndex > 0 && !zoomed && (
        <button
          style={{ left: '1rem', transform: 'scaleX(-1) translateY(-50%)' }}
          onClick={(e) => {
            e.stopPropagation();
            setPhotoIndex((i) => i - 1);
          }}
        >
          &#x279C;
        </button>
      )}
      <span>
        <img
          ref={imgRef}
          src={photos?.[photoIndex]?.url}
          alt={`${styleName} photo ${photoIndex + 1} / ${photos?.length}`}
          style={
            zoomed
              ? {
                  scale: `${ZOOM_SCALE * 100}%`,
                  transform: `translate(${translateX}px,${translateY}px)`,
                }
              : { scale: '100%', transform: 'translate(0px,0px)' }
          }
        />
      </span>
      {photoIndex < photos?.length - 1 && !zoomed && (
        <button
          style={{ right: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            setPhotoIndex((i) => i + 1);
          }}
        >
          &#x279C;
        </button>
      )}
      {expanded && !zoomed && (
        <button
          style={{
            top: '1rem',
            right: '1rem',
            transform: 'translateY(0)',
            backgroundColor: 'transparent',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed(false);
            setExpanded((e) => !e);
          }}
        >
          &#x26F6;
        </button>
      )}
    </div>
  );
};

export default Carousel;
