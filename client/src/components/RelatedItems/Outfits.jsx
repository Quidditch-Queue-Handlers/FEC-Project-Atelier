import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import ReviewStars from '../common/ReviewStars';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  getDetailById,
  getProductInfoById,
  getReviewsMeta, 
} from './api/product-api';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Outfits = ({ productId }) => { 
  const [swiperRef, setSwiperRef] = useState(null);
  const [slides, setSlides] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    if (localStorage.slide) setSlides(JSON.parse(localStorage.slide));
  }, []);

  const handleRemoveOutfit = (id) => {
    const newSlides = slides.filter((item) => item.id !== id);
    setSlides(newSlides);
    localStorage.setItem('slide', JSON.stringify(newSlides)); 
  };

  const handleAddOutfit = async () => {
    try {
      // Check is already added or not...
      const isAlreadyAdded = slides.find(slide => slide.id === productId);
      if (isAlreadyAdded) {
        console.log('Outfit already added.');
        return; 
      }
  
      const [detailResponse, reviewsMetaResponse] = await Promise.all([
        getDetailById(productId),
        getReviewsMeta(productId),
      ]);
      const goodsDetail = detailResponse.data.results[0];
      
      const ratings = reviewsMetaResponse?.data?.ratings ?? {};
      let count = 0;
      let total = 0;
      Object.entries(ratings).forEach((entry) => {
        count += +(entry?.[1] ?? 0);
        total += +(entry?.[0] ?? 0) * +(entry?.[1] ?? 0);
      });
      let averageRate = total / count;
    
      const newSlideContent = {
        id: productId,
        ...goodsDetail,
        averageRate,
      };
    
      const updatedSlides = [...slides, newSlideContent];
      setSlides(updatedSlides);
      setRatings({...ratings, [productId]: averageRate});
    
      localStorage.setItem('slide', JSON.stringify(updatedSlides));
    } catch (error) {
      console.error('Error adding outfit: ', error);
    }
  };

  const handleRatingChange = (id, newRating) => {
    setRatings({...ratings, [id]: newRating});
  };
  return (
    <>
      <h4>YOUR OUTFIT</h4>
      <Swiper
        modules={[Virtual, Navigation]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        spaceBetween={50}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        virtual
      >
        <SwiperSlide>
          <div
            style={{
              cursor: 'pointer',
              height: '380px',
              width: '250px',
              border: 'solid',
              backgroundColor: '#e9e9e9',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handleAddOutfit}
          >
            <span style={{ fontSize: '200px', color: 'grey' }}>&#43;</span>
          </div>
        </SwiperSlide>

        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent.id} virtualIndex={index}>
            <div
              style={{
                height: '380px',
                width: '250px',
                border: 'solid',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  height: '250px',
                  backgroundColor: '#e9e9e9',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundImage: `url(${slideContent.photos[0].url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <span

                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                  onClick={() => handleRemoveOutfit(slideContent.id)}>
                    &#9746;
               </span>
              </div>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'flex-start',
                  padding: '0 10px',
                }}
              >
                <h2 style={{ fontWeight: 400, fontSize: '1rem' }}>
                  categroy
                </h2>
                <span style={{ fontWeight: 800 }}>
                  {slideContent.name.trim()}
                </span>
                <h3 style={{ fontSize: '1rem' }}>
                  ${slideContent.original_price}
                </h3>
                <ReviewStars
                  rating={ratings[slideContent.id] || 0}
                  ratingId={slideContent.id} 
                  onRatingChange={(newRating) => {
                  handleRatingChange(slideContent.id, newRating);
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Outfits;
