
import RelatedProducts from './RelatedProducts'
import Outfits from './Outfits'
const RelatedItems = ( {productId, setProductId} )=>{
  const onProductClick = (relatedProductId) => {
    setProductId(relatedProductId); 
  };
  return (
        <>
          <RelatedProducts productId={productId} setProductId={setProductId} />
          <Outfits productId={productId} />
        </>
      );
};
    
export default RelatedItems;