import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Render login inputs', () => {
  test('Username input should be in the document', () => {
    render(<App />);
    expect(screen.getByTestId('usernameLoginInput')).toBeInTheDocument();
  });

  test('Password input should be in the document', () => {
    render(<App />);
    expect(screen.getByTestId('passwordLoginInput')).toBeInTheDocument();
  });

  test('Submit input button should be in the document', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
