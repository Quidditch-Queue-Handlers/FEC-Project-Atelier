import React from 'react';

const Thumbnails = ( { photos } ) => {
  return <div>
    <ul className="pd-carousel-thumbnails">
      {photos?.map(photo => <li key={photo.thumbnail_url}>
        <img src={photo.thumbnail_url}></img>
      </li>)}
    </ul>
  </div>
}

export default Thumbnails;
