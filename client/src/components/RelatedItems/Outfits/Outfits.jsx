import { useState, useEffect } from 'react';
import { Rate } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  getRelatedIds,
  getDetailById,
  getReviewById,
  getProductInfoById,
} from '@/api/product-api.js';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const Outfits = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    if (localStorage.slide) setSlides(JSON.parse(localStorage.slide));
  }, []);

  const handleRemoveOutfit = (id) => {
    setSlides((pre) => {
      return pre.filter((item) => item.id !== id);
    });
    localStorage.removeItem('slide');
  };

  const handleAddOutfit = async () => {
    const allRes = await Promise.all([
      getDetailById(37311),
      getReviewById(37311),
    ]);
    const finalRes = [];

    const goodsDetail = allRes[0].results[0];
    let sum = 0;
    allRes[1].results.forEach((item) => {
      sum += item.rating;
    });

    let averageRate = sum / 5;
    finalRes.push({
      id: allRes[0].product_id,
      ...goodsDetail,
      averageRate,
    });
    setSlides(finalRes);
   
    localStorage.slide = JSON.stringify(finalRes);
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
            <PlusOutlined style={{ fontSize: '200px', color: 'grey' }} />
          </div>
        </SwiperSlide>

        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
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
                <CloseCircleOutlined
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                  onClick={() => handleRemoveOutfit(slideContent.id)}
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
                  categroy
                </span>
                <span style={{ fontWeight: 800 }}>
                  {slideContent.name.trim()}
                </span>
                <span style={{ fontSize: '12px' }}>
                  ${slideContent.original_price}
                </span>
                <Rate allowHalf defaultValue={3} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Outfits;
