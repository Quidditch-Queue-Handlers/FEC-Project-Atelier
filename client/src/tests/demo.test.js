import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

const DemoCounter = () => {
  const [counter, setCounter] = useState(0);
  return (
  <section className="counter">
    <p> counter: {counter}</p>
    <button onClick={() => (setCounter(counter + 1))}> increment </button>
  </section>
  );
}

describe('demo counter button tests', () => {

  it('should render counter button', () => {
    render(<DemoCounter/>);
    expect(screen.queryByRole('button', {name: "increment"})).toBeTruthy();
  })

  it('should increment the value on click', () => {
    render(<DemoCounter />);
    expect(screen.queryByText('counter: 0')).toBeTruthy();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('counter: 0')).toBeFalsy();
    expect(screen.queryByText('counter: 1')).toBeTruthy();
  })

})