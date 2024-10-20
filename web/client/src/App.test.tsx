import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render home', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Hello/i);
  expect(buttonElement).toBeInTheDocument();
});



