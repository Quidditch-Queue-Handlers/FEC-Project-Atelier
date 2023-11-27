import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ReviewStars from '../components/common/ReviewStars';

describe('rendering review stars', () => {

  it('should render 5 stars with radio inputs and labels', () => {
    const ratingId = 'some-rating-id'
    render(<ReviewStars rating={0} ratingId={'ratingId'}  />);
    new Array(5).forEach((_,i) => {
      expect(screen.getByLabelText(`Star ${i+1}`)).toBeTruthy(); 
    })
  })

})