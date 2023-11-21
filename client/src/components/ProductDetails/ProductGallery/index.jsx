import React, { useState } from 'react';
import Thumbnails from './Thumbnails';
import Carousel from './Carousel';

const ProductGallery = ({ styleInfo }) => {
  const [expanded, setExpanded] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div
      className="pd-gallery-container"
      style={{ position: `${expanded ? 'absolute' : 'relative'}` }}
      onClick={() => setExpanded(e => !e)}
    >
      <Thumbnails photoIndex={photoIndex} photos={styleInfo?.photos} />
      <Carousel photoIndex={photoIndex} photos={styleInfo?.photos} setPhotoIndex={setPhotoIndex} />
    </div>
  )
}

export default ProductGallery;
