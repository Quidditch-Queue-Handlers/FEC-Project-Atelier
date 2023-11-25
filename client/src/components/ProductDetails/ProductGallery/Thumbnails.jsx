import React from 'react';

const Thumbnails = ( { photos, styleName } ) => {
  return <div>
    <ul className="pd-carousel-thumbnails">
      {photos?.map((photo, i) => <li key={photo.thumbnail_url}>
        <img
          src={photo.thumbnail_url}
          alt={`${styleName} preview ${i + 1} / ${photos?.length}`}
        />
      </li>)}
    </ul>
  </div>
}

export default Thumbnails;
