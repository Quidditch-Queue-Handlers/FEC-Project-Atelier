import { useState, useEffect } from 'react';
import { Rate, Modal } from 'antd';
import { StarOutlined } from '@ant-design/icons';
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

const RelatedProducts = () => {
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
      const res = await getRelatedIds();
      const finalRes = [];

      res.forEach(async (item, index) => {
        const allRes = await Promise.all([
          getDetailById(item),
          getReviewById(item),
        ]);
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
        if (index === res.length - 1) {
          setSlides(finalRes);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompare = async (id) => {
    console.log(id, 'slideContentslideContent');

    const res = await Promise.all([
      getProductInfoById(37311),
      getProductInfoById(id),
    ]);
    console.log(res, 'resss');

    setFixedCompareInfo(res);

    const arr = [];
    const mainFeat = res[0].features;
    const currentFeat = res[1].features;
    mainFeat.forEach((item) => arr.push(item.feature));
    currentFeat.forEach((item) => arr.push(item.feature));
    const _arr = [...new Set(arr)];
    console.log(_arr, 'arrarrarr');

    const final = {};
    _arr.forEach((item) => {
      mainFeat.forEach((v) => {
        if (item === v.feature) {
          final[item] = [v.value];
        }
      });
      currentFeat.forEach((v) => {
        if (item === v.feature) {
          if (final[item]) final[item].push(v.value);
          else final[item] = ['', v.value];
        }
      });
    });
    let _final = {};
    for (let key in final) {
      let value = final[key];
      if (final[key].length == 1) value = [...final[key], ''];
      _final[key] = value;
    }
    console.log(_final, 'finalfinalfinal');
    setFeatures(_final);

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderFeature = () => {
    let str = '';
    for (let key in features) {
      str += `<div
            style="
              display: flex;
              align-items: center;
              justify-content: space-around
            "
          >
            <span style="width:33%;text-align:center">${features[key][0]}</span>
            <h4 style="width:33%;text-align:center">${key}</h4>
            <span style="width:33%;text-align:center">${features[key][1]}</span>
          </div>`;
    }
    return { __html: str };
  };

  return (
    <>
      <h4>RELATED PRODUCTS</h4>
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
                {/* <img src={slideContent.photos[0].url} alt="" /> */}
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
                <Rate allowHalf defaultValue={slideContent.averageRate} />
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>{fixedCompareInfo[0]?.name}</h4>
          <h4>{fixedCompareInfo[1]?.name}</h4>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <span style={{ width: '33%', textAlign: 'center' }}>
            {fixedCompareInfo[0]?.category}
          </span>
          <h4 style={{ width: '33%', textAlign: 'center' }}>category</h4>
          <span style={{ width: '33%', textAlign: 'center' }}>
            {fixedCompareInfo[1]?.category}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <span style={{ width: '33%', textAlign: 'center' }}>
            {fixedCompareInfo[0]?.default_price}
          </span>
          <h4 style={{ width: '33%', textAlign: 'center' }}>price</h4>
          <span style={{ width: '33%', textAlign: 'center' }}>
            {fixedCompareInfo[1]?.default_price}
          </span>
        </div>
        <div dangerouslySetInnerHTML={renderFeature()}></div>
      </Modal>
    </>
  );
};

export default RelatedProducts;
