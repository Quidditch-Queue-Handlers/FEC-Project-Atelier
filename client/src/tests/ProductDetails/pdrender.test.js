import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ExampleProducts from '../../../examples/Product-examples/exampleProducts.json';
import ExampleProductInfo from '../../../examples/Product-examples/exampleProductInfo.json';
import ExampleProductStyles from '../../../examples/Product-examples/exampleProductStyles.json';

import ProductCartActions from '../../components/ProductDetails/ProductCartActions';
import ProductGallery from '../../components/ProductDetails/ProductGallery';
import ProductStyleSelector from '../../components/ProductDetails/ProductStyleSelector';
import ProductPrice from '../../components/ProductDetails/ProductPrice';
import ProductDetails from '../../components/ProductDetails';
import ProductInfo from '../../components/ProductDetails/ProductInfo';
import SocialShare from '../../components/ProductDetails/SocialShare';
import Thumbnails from '../../components/ProductDetails/ProductGallery/Thumbnails';
import Carousel from '../../components/ProductDetails/ProductGallery/Carousel';
import SizeSelector from '../../components/ProductDetails/ProductCartActions/SizeSelector';
import QuantitySelector from '../../components/ProductDetails/ProductCartActions/QuantitySelector';
import Selector from '../../components/ProductDetails/ProductCartActions/Selector';


describe('render product details', () => {

  it('should render a generic selector', () => {
    render(<Selector name="a select" id="a select" label="some label"  />);

    expect(screen.getByRole('combobox')).toBeTruthy();
    expect(screen.getByLabelText('some label')).toBeTruthy(); 

  })

  it('should render sku select', () => {
    const selectedStyle = ExampleProductStyles.results[0]; 
    const inStockSkus = Object.entries(selectedStyle?.skus ?? {})?.filter(sku => (sku?.[1]?.quantity ?? 0) > 0);
    render(<SizeSelector inStockSkus={inStockSkus} selectedSku={inStockSkus[0][0]} showLabel={true} />);

    expect(screen.getByRole('combobox')).toBeTruthy();
    expect(screen.getAllByRole('option').length).toBe(inStockSkus.length + 1);
    expect(screen.getByLabelText('Please select size')).toBeTruthy(); 

  });

  it('should render quantity select', () => {
    const selectedStyle = ExampleProductStyles.results[0]; 
    const inStockSkus = Object.entries(selectedStyle?.skus ?? {})?.filter(sku => (sku?.[1]?.quantity ?? 0) > 0);
    const selectedSku = inStockSkus[0]
    render(<QuantitySelector selectedSku={selectedSku[0]} selectedStyle={selectedStyle} selectedQuantity={undefined} setSelectedQuantity={() => {}}/>)
    
    expect(screen.getByRole('combobox')).toBeTruthy();
    expect(screen.getAllByRole('option').length).toBe(selectedSku[1].quantity + 1);
    expect(screen.getByLabelText(`select quantity for ${selectedStyle?.name} sku ${selectedSku[0]}`)).toBeTruthy(); 

  })

  it('should render cart actions', () => {
    render(<ProductCartActions />);
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getAllByRole('combobox').length).toBe(2);
  });

  it('should render x product style selects & images', () => {
    render(<ProductStyleSelector selectedStyle={ExampleProductStyles.results[0]} productStyles={ExampleProductStyles} setSelectedStyle={() => {}}  />);
    ExampleProductStyles.results.forEach((style) => {
      expect(screen.getByLabelText(style.name)).toBeTruthy(); 
      expect(screen.getByRole('img', {name: `style ${style.name} select preview`})).toBeTruthy();
    });
  });

  it('should render product price', () => {
    render(<ProductPrice selectedStyle={ExampleProductStyles.results[0]} />);
    expect(screen.getByText(`$${ExampleProductStyles.results[0].original_price}`)).toBeTruthy();
  });

  it('should render product sale price', () => {
    render(<ProductPrice selectedStyle={ExampleProductStyles.results[2]} />);
    expect(screen.getByText(`$${ExampleProductStyles.results[2].sale_price}`)).toBeTruthy();
    expect(screen.getByText(`$${ExampleProductStyles.results[2].original_price}`)).toBeTruthy();
  })

  it('should render product info', () => {
    render(<ProductInfo info={ExampleProductInfo} />);
    expect(screen.getByText(ExampleProductInfo.slogan)).toBeTruthy(); 
    expect(screen.getByText(ExampleProductInfo.description)).toBeTruthy(); 
    ExampleProductInfo.features.forEach(feature => {
      expect(screen.getByText(`${feature.feature}: ${feature.value}`)).toBeTruthy(); 
    });
  });

  it('should render share buttons', () => {
    render(<SocialShare />);
    expect(screen.getAllByRole('button').length).toBe(3);
  });

  it('should render select style thumbnails', () => {
    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Thumbnails photos={photos} photoIndex={0} styleName={styleName} setPhotoIndex={() => {}} />)
    photos.forEach((photo, i) => {
      expect(screen.getByLabelText(`${styleName} preview select ${i + 1} / ${photos?.length}`)).toBeTruthy(); 
      expect(screen.getByRole('img', {name: `${styleName} preview ${i + 1} / ${photos?.length}`})).toBeTruthy();
    })
  });

  it('should render image carousel with only next button', () => {

    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Carousel containerRef={null} photoIndex={0} photos={photos} styleName={styleName} expanded={false} setExpanded={() => {}}  />);
    expect(screen.getByRole('img')).toBeTruthy(); 
    expect(screen.getAllByRole('button').length).toBe(1); 

  });

  it('should render image carousel with both nav buttons', () => {

    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Carousel containerRef={null} photoIndex={1} photos={photos} styleName={styleName} expanded={false} setExpanded={() => {}}  />);
    expect(screen.getByRole('img')).toBeTruthy(); 
    expect(screen.getAllByRole('button').length).toBe(2); 
  });

  it('should render expanded zoomed image carousel', () => {
    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Carousel containerRef={null} photoIndex={0} photos={photos} styleName={styleName} expanded={true} zoomed={true} setExpanded={() => {}}  />);
    expect(screen.getByRole('img')).toBeTruthy(); 
    expect(screen.queryAllByRole('button').length).toBe(0); 
  });

  it('should render whole image gallery component', () => {
    render(<ProductGallery styleInfo={ExampleProductStyles?.results?.[0]} />);
    expect(screen.getAllByRole('generic')).toBeTruthy();
  });

  xit('should render whole product details component', async() => {
    const product = Object.entries(ExampleProducts)[0]; 
    //render(<ProductDetails productId={product[1].id} />);
    // TODO: test when the product info and styles can be passed in as props
    
  });


});