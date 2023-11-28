import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import FeatureComparison from './FeatureComparison'; 
import ReviewStars from '../../common/ReviewStars';
import {
  getRelatedIds,
  getDetailById,
  getProductInfoById,
  getReviewsMeta,
} from '../api/product-api';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const RelatedProducts = ( {productId} ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);
  const [slides, setSlides] = useState([]);
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
  const handleCompare = async (compareProductId) => {
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

  return (
    <>
      <h4>RELATED PRODUCTS</h4>
      <Swiper
  modules={[Virtual, Navigation, Pagination]}
  onSwiper={setSwiperRef}
  slidesPerView={3}
  spaceBetween={50}
  pagination={{
    type: 'fraction',
  }}
  navigation={true}
  virtual
>
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
            backgroundColor: 'grey',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `url(${slideContent.photos[0].url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <StarOutlined
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              color: 'white',
            }}
            onClick={() => handleCompare(slideContent.id)}
          />
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
          <span style={{ fontWeight: 400, fontSize: '15px' }}>
          {slideContent.category}
          </span>
          <span style={{ fontWeight: 800 }}>
            {slideContent.name.trim()}
          </span>
          <span style={{ fontSize: '12px' }}>
            ${slideContent.original_price}
          </span>
          <ReviewStars
            rating={slideContent.averageRate}
            ratingId={`review_${slideContent.id}`}
          />
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      <Modal
        title="COMPARING"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
      </Modal>
    </>
  );
};
export default RelatedProducts;