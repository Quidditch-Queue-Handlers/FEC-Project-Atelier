import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ProductCartActions from '../../components/ProductDetails/ProductCartActions';
import ProductGallery from '../../components/ProductDetails/ProductGallery';
import ProductStyleSelector from '../../components/ProductDetails/ProductStyleSelector';
import ProductDetails from '../../components/ProductDetails';

describe('render product details', () => {

  it('should render cart actions', () => {
    render(<ProductCartActions />);
    expect(screen.getAllByRole('button').length).toBe(2);
    //TODO: complete tests
  });

  it('should render product gallery', () => {
    render(<ProductGallery />);
    expect(screen.getByText('Carousel')).toBeTruthy();
    expect(screen.getByText('Thumbnails')).toBeTruthy();
    //TODO: complete tests

  });

  it('should render style selector', () => {
    render(<ProductStyleSelector />);
    expect(screen.getByText('ProductStyleSelector')).toBeTruthy();
    //TODO: complete tests

  });

  it('should render product details', () => {
    render(<ProductDetails />);
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    //TODO: complete tests

  });


})