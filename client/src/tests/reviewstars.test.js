import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react';

import ReviewStars from '../components/common/ReviewStars';

describe('rendering review stars', () => {

  it('should render 5 stars with radio inputs and labels', () => {
    const ratingId = 'some-rating-id'
    render(<ReviewStars rating={3.5} ratingId={ratingId}  />);
    new Array(5).forEach((_,i) => {
      const starRadio = screen.getByLabelText(`Star ${i+1}`)
      expect(starRadio).toBeTruthy(); 
      //the 3th star should be checked
      i !== 2 ? expect(starRadio).not.toBeChecked() : expect(starRadio).toBeChecked(); 
    });

    const spans = screen.getAllByTestId('star-fill-span');
    spans.forEach((span,i) => {
      expect(span).toHaveStyle(`width: ${i <= 2 ? '100%' : i === 3 ? '50%' : '0%' }`)
    })

  })

})