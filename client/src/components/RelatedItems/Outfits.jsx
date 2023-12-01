import React, { useState, useEffect } from 'react';
import ReviewStars from '../common/ReviewStars';
import {
  getDetailById,
  getReviewsMeta,
} from './api/product-api';

const Outfits = ({ productId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const storedSlides = localStorage.getItem('slide');
    if (storedSlides) {
      setSlides(JSON.parse(storedSlides));
    }
  }, []);

  const handleRemoveOutfit = (id) => {
    const newSlides = slides.filter(slide => slide.id !== id);
    setSlides(newSlides);
    localStorage.setItem('slide', JSON.stringify(newSlides));
  };

  const handleAddOutfit = async () => {
    if (slides.some(slide => slide.id === productId)) return;

    try {
      const [detailResponse, reviewsMetaResponse] = await Promise.all([
        getDetailById(productId),
        getReviewsMeta(productId),
      ]);

      const newSlideContent = {
        id: productId,
        ...detailResponse.data.results[0],
        averageRate: calculateAverageRate(reviewsMetaResponse?.data?.ratings),
      };

      setSlides(prevSlides => [...prevSlides, newSlideContent]);
      localStorage.setItem('slide', JSON.stringify([...slides, newSlideContent]));
    } catch (error) {
      console.error('Error adding outfit: ', error);
    }
  };

  const calculateAverageRate = (ratings) => {
    let total = 0, count = 0;
    for (const [rate, number] of Object.entries(ratings || {})) {
      total += rate * number;
      count += number;
    }
    return count > 0 ? total / count : 0;
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => prevSlide === 0 ? slides.length - 1 : prevSlide - 1);
  };

  // 样式定义，保持与 RelatedProducts 组件一致
  const carouselContainerStyle = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  };
  
  const carouselWrapperStyle = {
    display: 'flex',
    transform: `translateX(-${currentSlide * 30}%)`, 
    transition: 'transform 0.3s ease-in-out',
  };
  
  const carouselSlideStyle = {
    flex: '0 0 30%',
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    margin: '0 5px',
  };

  const imageStyle = {
    height: '250px',
    backgroundColor: 'grey',
    position: 'relative',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const slideImageStyle = {
    height: '380px',
    width: '250px',
    border: 'solid',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', 
    }
  const firststyle = {
    height: '380px',
    width: '250px',
    border: 'solid',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', 
    backgroundColor: '#e9e9e9',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const carouselControlStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  const carouselPrevStyle = {
    ...carouselControlStyle,
    left: '10px',
  };

  const carouselNextStyle = {
    ...carouselControlStyle,
    right: '10px',
  };
  const OutfitStyles = {
    maxWidth: '80%', 
    margin: '0 auto', 
  };

  return (
    <div style={OutfitStyles}>
      <h4>YOUR OUTFIT</h4>
      <div style={carouselContainerStyle}>
        <div style={carouselWrapperStyle}>
          <div style={carouselSlideStyle}>
            <div style={firststyle}>
              <span style={{ cursor: 'pointer', fontSize: '200px', color: 'grey' }} onClick={handleAddOutfit}>&#43;</span>
            </div>
          </div>
          {slides.map((slide, index) => (
            <div key={slide.id} style={carouselSlideStyle}>
              <div style={slideImageStyle}>
                <div style={{ ...imageStyle, backgroundImage: `url(${slide.photos[0].url})` }}>
                  <span style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'white' }}
                      onClick={() => handleRemoveOutfit(slide.id)}>
                    &#9746;
                  </span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: '0 10px' }}>
                  <span>{slide.category}</span>
                  <span>{slide.name}</span>
                  <span>${slide.original_price}</span>
                  <ReviewStars rating={ratings[slide.id] || slide.averageRate} ratingId={`review_${slide.id}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button style={carouselNextStyle} onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Outfits;