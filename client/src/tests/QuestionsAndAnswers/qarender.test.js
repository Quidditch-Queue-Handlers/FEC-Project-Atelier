import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import exampleAnswer3209065 from '../../../examples/QA-examples/exampleAnswer3209065.json';
import exampleQuestionCall from '../../../examples/QA-examples/exampleQuestionCall.json';

import QuestionsAndAnswers from '../../components/QuestionsAndAnswers';
import Search from '../../components/QuestionsAndAnswers/Search';
import AddQuestion from '../../components/QuestionsAndAnswers/AddQuestion';
import AddModal from '../../components/QuestionsAndAnswers/AddModal';
import QAList from '../../components/QuestionsAndAnswers/QAList';
import QAListItem from '../../components/QuestionsAndAnswers/QAList/QAListItem';
import Helpful from '../../components/QuestionsAndAnswers/QAList/QAListItem/Helpful';
import AddAnswer from '../../components/QuestionsAndAnswers/QAList/QAListItem/AddAnswer';
import AnswerList from '../../components/QuestionsAndAnswers/QAList/QAListItem/AnswerList';
import AnswerListItem from '../../components/QuestionsAndAnswers/QAList/QAListItem/AnswerList/AnswerListItem';



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