import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders SignIn component when no token in local storage', () => {
    // Clear local storage before the test
    localStorage.removeItem('token');

    render(<App />);
    const signInElement = screen.getByText(/LOGIN/i);
    expect(signInElement).toBeInTheDocument();
  });
});
