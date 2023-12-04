import React from 'react';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import RatingsAndReviews from '../../components/RatingsAndReviews';
import ProductBreakdown from '../../components/RatingsAndReviews/ProductBreakdown';
import RatingBar from '../../components/RatingsAndReviews/RatingBars';
import RatingBars from '../../components/RatingsAndReviews/RatingBars';
import RatingBreakdown from '../../components/RatingsAndReviews/RatingBreakdown';
import Review from '../../components/RatingsAndReviews/Review';
import ReviewsList from '../../components/RatingsAndReviews/ReviewsList';
import Sorting from '../../components/RatingsAndReviews/Sorting';
import WriteReview from '../../components/RatingsAndReviews/WriteReview';

import ExampleReviews from '../../../examples/RR-examples/ExampleReviews.json';
import ExampleMeta from '../../../examples/RR-examples/ExampleMeta.json';

// const tester = jest.fn();

describe('render ratings and reviews details', () => {

  it('should render a review', () => {
    render(<ReviewsList reviews={ExampleReviews.results} />);
    expect(screen.getByText("ayes yes suts ut great")).toBeTruthy();
  });

});