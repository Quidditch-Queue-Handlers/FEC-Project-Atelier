import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ProductDetails from '../../components/ProductDetails'

describe('render product details', () => {

  xit('should render product details', () => {
    render(<ProductDetails />);
    expect(screen.getByText('Hello from product details')).toBeTruthy();
  })

})