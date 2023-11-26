import React from 'react'; 
import SocialIcons from './SocialIcons'; 

const shareOptions = [
  {
    network: 'Facebook', 
    shareUrl: (resource) =>  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resource)}`
  },
  {
    network: 'Twitter', 
    shareUrl: (resource) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(resource)}`
  },
  {
    network: 'Pinterest', 
    shareUrl: (resource) => `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(resource)}`
  },

]

const SocialShare = () => {
  return (
    <div>
      {shareOptions.map(network => (
        <button 
          key={network.network}
          onClick={() => {
            const shareLink = network.shareUrl(window.location); 
            window.open(shareLink);
          }}
          className='pd-share-button'
        >
          <SocialIcons size={34} icon={network.network}/>
        </button>
        
      ))}
    </div>
  )
}

export default SocialShare;