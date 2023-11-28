import React from 'react';
import { render, fireEvent, screen, findByRole } from '@testing-library/react';

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
    const options = new Array(5); 
    const onChange = jest.fn(); 
    render(<Selector name="a select" id="a select" label="some label" onChange={onChange}>
      {options.map((_,i) => <option value={i}>{i}</option>)}
    </Selector>);

    const comboBox = screen.getByRole('combobox'); 

    expect(comboBox).toBeTruthy();
    expect(screen.getByLabelText('some label')).toBeTruthy(); 

    fireEvent.change(comboBox, {target: {value: 2}}); 
    expect(onChange).toHaveBeenCalledTimes(1); 
    
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
    const selectedStyle = ExampleProductStyles.results[0]; 
    const inStockSkus = Object.entries(selectedStyle?.skus ?? {})?.filter(sku => (sku?.[1]?.quantity ?? 0) > 0);

    render(<ProductCartActions selectedStyle={selectedStyle} />);
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getAllByRole('combobox').length).toBe(2);
    const addToCartButton = screen.getByText('Add to Cart');
    expect(addToCartButton).toBeTruthy(); 
    //click without sku selected
    fireEvent.click(addToCartButton); 
    
    //select a sku
    const skuSelect = screen.getByText('Select Size');
    expect(skuSelect).toBeTruthy(); 
    fireEvent.change(skuSelect, {target: {value: inStockSkus[0][0] }});

    fireEvent.click(addToCartButton); 

  });

  it('should render x product style selects & images', () => {
    const setSelectedSyle = jest.fn(); 
    render(<ProductStyleSelector selectedStyle={ExampleProductStyles.results[0]} productStyles={ExampleProductStyles} setSelectedStyle={setSelectedSyle}  />);
    ExampleProductStyles.results.forEach((style) => {
      expect(screen.getByLabelText(style.name)).toBeTruthy(); 
      expect(screen.getByRole('img', {name: `style ${style.name} select preview`})).toBeTruthy();
    });
    const radioGroup = screen.getAllByRole('radio'); 
    expect(radioGroup.length).toBe(ExampleProductStyles.results.length); 
    fireEvent.click(radioGroup[2]);
    expect(setSelectedSyle).toHaveBeenCalledTimes(2); 
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
    const shareButtons = screen.getAllByRole('button')
    expect(shareButtons.length).toBe(3);
    fireEvent.click(shareButtons[0]);
  });

  it('should render select style thumbnails', () => {
    const setPhotoIndex = jest.fn(); 
    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Thumbnails photos={photos} photoIndex={0} styleName={styleName} setPhotoIndex={setPhotoIndex}  />)
    photos.forEach((photo, i) => {
      expect(screen.getByLabelText(`${styleName} preview select ${i + 1} / ${photos?.length}`)).toBeTruthy(); 
      expect(screen.getByRole('img', {name: `${styleName} preview ${i + 1} / ${photos?.length}`})).toBeTruthy();
    });
    const radioOpts = screen.getAllByRole('radio'); 
    fireEvent.click(radioOpts[2]); 
    expect(setPhotoIndex).toHaveBeenCalledTimes(2); 
    const nextButton = screen.getAllByRole('button'); 
    expect(nextButton.length).toBe(1); 
    fireEvent.click(nextButton[0]); 
    
  });

  it('should render image carousel with only next button', () => {
    const setExpanded = jest.fn(); 
    const setPhotoIndex = jest.fn(); 
    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Carousel containerRef={null} photoIndex={0} photos={photos} styleName={styleName} expanded={false} setExpanded={setExpanded} setPhotoIndex={setPhotoIndex}  />);
    const img = screen.getByRole('img')
    expect(img).toBeTruthy(); 
    fireEvent.click(img); 
    expect(setExpanded).toHaveBeenCalledTimes(1); 
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(1); 
    fireEvent.click(buttons[0]);
    expect(setPhotoIndex).toHaveBeenCalledTimes(1); 


  });

  it('should render image carousel with both nav buttons', () => {
    const setPhotoIndex = jest.fn(); 
    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Carousel containerRef={null} photoIndex={1} photos={photos} styleName={styleName} expanded={false} setExpanded={() => {}} setPhotoIndex={setPhotoIndex}  />);
    expect(screen.getByRole('img')).toBeTruthy(); 
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(2); 
    fireEvent.click(buttons[0]); 
    fireEvent.click(buttons[1]); 
    expect(setPhotoIndex).toHaveBeenCalledTimes(2); 
  });

  it('should render expanded image carousel', () => {
    const setExpanded = jest.fn(); 
    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Carousel containerRef={null} photoIndex={0} photos={photos} styleName={styleName} expanded={true} zoomed={false} setExpanded={setExpanded} setZoomed={() => {}} />);
    expect(screen.getByRole('img')).toBeTruthy(); 
    const closeBtn = screen.getByText('⛶');
    expect(closeBtn).toBeTruthy(); 
    fireEvent.click(closeBtn);
  });

  it('should render expanded zoomed image carousel', () => {
    const photos = ExampleProductStyles.results[0].photos;
    const styleName = ExampleProductStyles.results[0].name;
    render(<Carousel containerRef={null} photoIndex={0} photos={photos} styleName={styleName} expanded={true} zoomed={true} setExpanded={() => {}}  />);
    const img = screen.getByRole('img')
    expect(img).toBeTruthy(); 
    expect(screen.queryAllByRole('button').length).toBe(0); 
    fireEvent.mouseMove(img)
  });

  it('should render whole image gallery component', () => {
    render(<ProductGallery styleInfo={ExampleProductStyles?.results?.[0]} />);
    expect(screen.getAllByRole('generic')).toBeTruthy();
  });

  it('should render whole product details component', async() => {
    const product = Object.entries(ExampleProducts)[0]; 
    render(<ProductDetails productId={product[1].id} />);
    expect(await screen.findByRole('heading', {level: 1})).toBeTruthy(); 
    // TODO: test when the product info and styles can be passed in as props
    
  });


});