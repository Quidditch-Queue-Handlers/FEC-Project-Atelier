import React, { useState, useEffect } from 'react';
import { StarOutlined } from '@ant-design/icons';
import ReviewStars from '../../common/ReviewStars';
import FeatureComparison from './FeatureComparison'; 
import {
  getRelatedIds,
  getDetailById,
  getProductInfoById,
  getReviewsMeta,
} from '../api/product-api';

const RelatedProducts = ({ productId, setProductId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [compareProduct, setCompareProduct] = useState(null);
  const [fixedCompareInfo, setFixedCompareInfo] = useState([]);
  const [features, setFeatures] = useState({});


  useEffect(() => {
    getRelatedIdsApi();
  }, []);

  const getRelatedIdsApi = async () => {
    try {
      const res = await getRelatedIds(productId);
      const finalRes = [];
  
      for (const item of res.data) {
        const [detailRes, reviewRes, productInfoRes] = await Promise.all([
          getDetailById(item),
          getReviewsMeta(item),
          getProductInfoById(item), 
        ]);
        // console.log('djfkdjfdkfj', reviewRes.data)
        const goodsDetail = detailRes.data.results[0];
        const productInfo = productInfoRes.data;
  
        let sum = 0;
        const ratings = reviewRes?.data?.ratings ?? {};
        // console.log('stat!!!!!!!!!here!!!!!!!', ratings)
        let count = 0;
        let total = 0;
        Object.entries(ratings).forEach((entry) => {
          count += +(entry?.[1] ?? 0);
          total += +(entry?.[0] ?? 0) * +(entry?.[1] ?? 0);
        });
        let averageRate = total / count;
  
        finalRes.push({
          id: item,
          ...goodsDetail,
          averageRate,
          category: productInfo.category,
        });
      }
      setSlides(finalRes);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCompare = async (event, compareProductId) => {
    event.stopPropagation();
    try {
      const [mainProductInfo, compareProductInfo] = await Promise.all([
        getProductInfoById(productId), 
        getProductInfoById(compareProductId), 
      ]);
  
      setFixedCompareInfo([mainProductInfo.data, compareProductInfo.data]);
      const mainFeatures = mainProductInfo.data.features;
      const compareFeatures = compareProductInfo.data.features;
      const featureSet = new Set([...mainFeatures.map(f => f.feature), ...compareFeatures.map(f => f.feature)]);
      const featureComparison = {};
  
      featureSet.forEach(feature => {
        const mainFeature = mainFeatures.find(f => f.feature === feature);
        const compareFeature = compareFeatures.find(f => f.feature === feature);
  
        featureComparison[feature] = [
          mainFeature ? mainFeature.value : 'N/A',
          compareFeature ? compareFeature.value : 'N/A',
        ];
      });
  
      setFeatures(featureComparison);
      setIsModalOpen(true);
      setCompareProduct(compareProductInfo.data);
    } catch (err) {
      console.error('Error in handleCompare:', err);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onProductClick = (relatedProductId) => {
    setProductId(relatedProductId);
  };
  // Carousel style
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

  const carouselSlideActiveStyle = {
    ...carouselSlideStyle,
    opacity: 1,
  };

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
  const handlePrev = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : Math.ceil(slides.length / 3.5) - 1);
  };
  
  const handleNext = () => {
      setCurrentSlide(currentSlide < Math.ceil(slides.length / 3.5) - 1 ? currentSlide + 1 : 0);
  };
  
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 1000,
    display: isModalOpen ? 'block' : 'none',
  };

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: isModalOpen ? 'block' : 'none',
  };
  const slideImageStyle = {
    height: '380px',
    width: '250px',
    border: 'solid',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', 
    }
  const imageStyle = {
    height: '250px',
    backgroundColor: 'grey',
    position: 'relative',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const starStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    color: 'green',   
    zIndex: 10,
  }
  const relatedProductsContainerStyle = {
    maxWidth: '80%', 
    margin: '0 auto', 
  };


  return (
    <div style={relatedProductsContainerStyle}>
      <h4>RELATED PRODUCTS</h4>
      <div style={carouselContainerStyle}>
        <div style={carouselWrapperStyle}>
          {slides.map((slideContent, index) => (
            <div
              key={slideContent.id}
              style={index === currentSlide ? carouselSlideActiveStyle : carouselSlideStyle}
              onClick={() => onProductClick(slideContent.id)}
              data-testid={`product-${slideContent.id}`}
            >
              <div style={slideImageStyle}>
                <img src={slideContent.photos[0].url} style={imageStyle} alt="Product Image" />
                <StarOutlined style={starStyles} onClick={(e) => handleCompare(e, slideContent.id)}  data-testid={`compare-button-${slideContent.id}`} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: '0 10px' }}>
                  <span style={{ fontWeight: 400, fontSize: '15px' }}>{slideContent.category}</span>
                  <span style={{ fontWeight: 800 }}>{slideContent.name.trim()}</span>
                  <span style={{ fontSize: '12px' }}>${slideContent.original_price}</span>
                  <ReviewStars rating={slideContent.averageRate} ratingId={`review_${slideContent.id}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {currentSlide !== 0 && (
        <button style={carouselPrevStyle} onClick={handlePrev}>&lt;</button>
      )}

        <button style={carouselNextStyle} onClick={handleNext}>&gt;</button>
      </div>

      <div style={backdropStyle} onClick={handleCompare}></div>
      <div style={modalStyle}>
        {fixedCompareInfo.length > 0 && (
         <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h4>{fixedCompareInfo[0]?.name}</h4>
          <h4>{fixedCompareInfo[1]?.name}</h4>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <span style={{ width: '33%', textAlign: 'center' }}>{fixedCompareInfo[0]?.category}</span>
            <h4 style={{ width: '33%', textAlign: 'center' }}>Category</h4>
            <span style={{ width: '33%', textAlign: 'center' }}>{fixedCompareInfo[1]?.category}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <span style={{ width: '33%', textAlign: 'center' }}>{fixedCompareInfo[0]?.default_price}</span>
            <h4 style={{ width: '33%', textAlign: 'center' }}>Price</h4>
            <span style={{ width: '33%', textAlign: 'center' }}>{fixedCompareInfo[1]?.default_price}</span>
          </div>
          {Object.entries(features).map(([feature, values]) => (
            <FeatureComparison key={feature} feature={feature} values={values} />
          ))}
        </>
        )}
       <button onClick={handleCancel}>Close</button>
      </div>
    </div>
  );
};


export default RelatedProducts;