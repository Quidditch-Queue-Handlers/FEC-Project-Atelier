import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import QuestionsAndAnswers from '../../components/QuestionsAndAnswers';

describe('render product details', () => {
  it('should render the whole component and all subcomponents', () => {
    render(<QuestionsAndAnswers />);
    expect(screen.getAllByRole('button').length).toBe(7); //will need to update this as components are updated to be conditionally rendered
    expect(screen.getAllByRole('textbox').length).toBe(1);
    expect(screen.getByText('Questions and Answers')).toBeTruthy();
    expect(screen.getAllByText('Search')).toBeTruthy();
    expect(screen.getByText('QAList')).toBeTruthy();
    expect(screen.getByText('QAListItem')).toBeTruthy();
    expect(screen.getByText('AddAnswer')).toBeTruthy();
    expect(screen.getByText('AnswerList')).toBeTruthy();
    expect(screen.getByText('AnswerListItem')).toBeTruthy();
    expect(screen.getByText('AddQuestion')).toBeTruthy();
    expect(screen.getAllByText('AddModal')).toBeTruthy();
  });
})