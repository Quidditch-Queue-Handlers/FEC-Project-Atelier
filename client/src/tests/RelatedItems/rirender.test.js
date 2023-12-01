import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProducts from '../../components/RelatedItems/RelatedProducts';
import * as productApi from '../../components/RelatedItems/api/product-api';

jest.mock('../../components/RelatedItems/api/product-api');

describe('RelatedProducts Component', () => {
  const mockProductId = '12345';
  const mockProductData = {
    id: '12345',
    name: 'Camo Onesie',
    category: 'Jackets',
    description: 'hahaha',
    default_price: '100',
  };

  const mockSetProductId = jest.fn();

  beforeEach(() => {
    productApi.getRelatedIds.mockResolvedValue({ data: [mockProductId] });
    productApi.getDetailById.mockResolvedValue({ data: { results: [mockProductData] } });
    productApi.getReviewsMeta.mockResolvedValue({ data: { ratings: { '5': 1 } } });
    productApi.getProductInfoById.mockResolvedValue({ data: mockProductData });
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    render(<RelatedProducts productId={mockProductId} setProductId={mockSetProductId} />);
    await waitFor(() => {
      expect(screen.getByText('RELATED PRODUCTS')).toBeInTheDocument();
    });
  });

  test('calls getRelatedIds API on initial render', async () => {
    render(<RelatedProducts productId={mockProductId} setProductId={mockSetProductId} />);
    await waitFor(() => {
      expect(productApi.getRelatedIds).toHaveBeenCalledWith(mockProductId);
    });
  });

  test('renders product details after API call', async () => {
    render(<RelatedProducts productId={mockProductId} setProductId={mockSetProductId} />);
    await waitFor(() => {
      expect(screen.getByText('Camo Onesie')).toBeInTheDocument();
      expect(screen.getByText('Jackets')).toBeInTheDocument();
    });
  });

  test('sets product ID on product click', async () => {
    render(<RelatedProducts productId={mockProductId} setProductId={mockSetProductId} />);
    await waitFor(() => {
      const firstProduct = screen.getByText('Camo Onesie');
      fireEvent.click(firstProduct);
      expect(mockSetProductId).toHaveBeenCalledWith('12345');
    });
  });

  test('opens compare modal on compare button click', async () => {
    render(<RelatedProducts productId={mockProductId} setProductId={mockSetProductId} />);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('compare-button-12345'));
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  test('closes compare modal on Close button click', async () => {
    render(<RelatedProducts productId={mockProductId} setProductId={mockSetProductId} />);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('compare-button-12345'));
      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByText('Close')).not.toBeInTheDocument();
    });
  });
});