
import RelatedProducts from './RelatedProducts'
import Outfits from './Outfits'
const RelatedItems = ( {productId} )=>{
    return (
        <>
          <RelatedProducts productId={productId} />
          <Outfits productId={productId} />
        </>
      );
    };
    
    export default RelatedItems;