import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Outfits from '../../components/RelatedItems/Outfits';
import * as productApi from '../../components/RelatedItems/api/product-api';

jest.mock('../../components/RelatedItems/api/product-api');

describe('Outfits Component', () => {
  const mockProductId = '12345';
  const mockSlideData = {
    id: '12345', 
    name: 'Camo Onesie', 
    category: 'Jackets', 
    description: 'hahaha', 
    original_price: '100',
    photos: [{url: 'image.jpg'}]
  };

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([mockSlideData]));
    Storage.prototype.setItem = jest.fn();
    productApi.getDetailById.mockResolvedValue({ data: { results: [mockSlideData] } });
    productApi.getReviewsMeta.mockResolvedValue({ data: { ratings: { '5': 1 } } });
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Outfits productId={mockProductId} />);
    expect(screen.getByText('YOUR OUTFIT')).toBeInTheDocument();
  });

  test('loads data from localStorage on initial render', () => {
    render(<Outfits productId={mockProductId} />);
    expect(localStorage.getItem).toHaveBeenCalledWith('slide');
    expect(screen.getByText('Camo Onesie')).toBeInTheDocument();
  });

  test('adds an outfit and updates localStorage', async () => {
    productApi.getDetailById.mockResolvedValueOnce({ data: { results: [mockSlideData] } });
    render(<Outfits productId={mockProductId} />);
    fireEvent.click(screen.getByTestId('add-outfit-button'));
    await waitFor(() => {
      expect(screen.getByText('Camo Onesie')).toBeInTheDocument();
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('slide', expect.any(String));
  });

  test('handles error when adding an outfit fails', async () => {
    productApi.getDetailById.mockRejectedValueOnce(new Error('Failed to fetch product details'));
    render(<Outfits productId={mockProductId} />);
    fireEvent.click(screen.getByTestId('add-outfit-button'));
    await waitFor(() => {
      expect(screen.getByText(/failed to add outfit/i)).toBeInTheDocument();
    });
  });

  test('removes an outfit and updates localStorage', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([mockSlideData]));
    render(<Outfits productId={mockProductId} />);
    fireEvent.click(screen.getAllByText('&#9746')[0]);
    expect(localStorage.setItem).toHaveBeenCalledWith('slide', expect.any(String));
    await waitFor(() => {
      expect(screen.queryByText('Camo Onesie')).not.toBeInTheDocument();
    });
  });
});