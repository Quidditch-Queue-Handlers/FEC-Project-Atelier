import React from 'react';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import exampleAnswer329065 from '../../../examples/QA-examples/exampleAnswer329065.json';
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

const tester = jest.fn();

describe('render questions and answers', () => {
  it('should render AnswerListItem', () => {
    render(<AnswerListItem answer={exampleAnswer329065.results[0]} reportButtonClickHandler={tester}/>);
    expect(screen.getByText('Debitis odit architecto autem dolor est.')).toBeTruthy();
    expect(screen.getByText('by Jennings.Wehner41, Oct 29, 2020 |')).toBeTruthy();

    expect(screen.getByText(/18/)).toBeTruthy();
    const reportButton = screen.getByText('report');
    fireEvent.click(reportButton);
    expect(tester).toHaveBeenCalledTimes(1);
    fireEvent.click(reportButton);
    expect(tester).toHaveBeenCalledTimes(1);

    expect(screen.getByRole('li')).toBeTruthy();
    expect(screen.getAllByRole('li').length).toBe(1);
  });

  it.skip('should render AnswerList', () => {
    render(<AnswerList />);
  });

  it.skip('should render AddModal', () => {
    render(<AddModal />);
  });

  it('should render AddAnswer', () => {
    render(<AddAnswer />);
  });

  it('should render AddQuestion', () => {
    render(<AddQuestion />);
  });

  it.skip('should render Helpful', () => {
    render(<Helpful />);
  });

  it.skip('should render QAListItem', () => {
    render(<QAListItem />);
  });

  it.skip('should render QAList', () => {
    render(<QAList />);
  });

  it('should render Search', () => {
    render(<Search searchTextChangeHandler={tester}/>);
  });

  it('should render QuestionsAndAnswers', () => {
    render(<QuestionsAndAnswers />);
  });

  // it('should render the whole component and all subcomponents', () => {
  //   render(<QuestionsAndAnswers />);
  //   expect(screen.getAllByRole('button').length).toBe(7); //will need to update this as components are updated to be conditionally rendered
  //   expect(screen.getAllByRole('textbox').length).toBe(1);
  //   expect(screen.getByText('Questions and Answers')).toBeTruthy();
  //   expect(screen.getAllByText('Search')).toBeTruthy();
  //   expect(screen.getByText('QAList')).toBeTruthy();
  //   expect(screen.getByText('QAListItem')).toBeTruthy();
  //   expect(screen.getByText('AddAnswer')).toBeTruthy();
  //   expect(screen.getByText('AnswerList')).toBeTruthy();
  //   expect(screen.getByText('AnswerListItem')).toBeTruthy();
  //   expect(screen.getByText('AddQuestion')).toBeTruthy();
  //   expect(screen.getAllByText('AddModal')).toBeTruthy();
  // });
})