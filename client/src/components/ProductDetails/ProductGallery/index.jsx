import React, { useState, useRef, useEffect } from 'react';
import Thumbnails from './Thumbnails';
import Carousel from './Carousel';

const ProductGallery = ({ styleInfo }) => {
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const [photoIndex, setPhotoIndex] = useState(0);


  useEffect(() => {
    setPhotoIndex(0);
    setExpanded(false); 
    setZoomed(false);
  }, [styleInfo])

  return (
    <div
      ref={containerRef}
      className="pd-gallery-container"
      style={{ position: `${expanded ? 'absolute' : 'relative'}` }}
    >
      {!zoomed && (
        <Thumbnails
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          photos={styleInfo?.photos}
          styleName={styleInfo?.name}
        />
      )}
      
      <Carousel
        photoIndex={photoIndex}
        setPhotoIndex={setPhotoIndex}
        photos={styleInfo?.photos}
        expanded={expanded}
        setExpanded={setExpanded}
        zoomed={zoomed}
        setZoomed={setZoomed}
        containerRef={containerRef}
        styleName={styleInfo?.name}
      />
    </div>
  )
}

export default ProductGallery;
