import React from 'react';
import { render, screen } from '@testing-library/react';
import CountdownTimer from '../components/CountdownTimer';

jest.useFakeTimers();

describe('CountdownTimer component', () => {
  test('renders time remaining', () => {
    const time = 30;
    const started = new Date();
    render(<CountdownTimer time={time} started={started} />);
    const timeRemaining = screen.getByText(`Time remaining: ${time} seconds`);
    expect(timeRemaining).toBeInTheDocument();
  });

  test('renders time ended', () => {
    const time = 0;
    const started = new Date();
    render(<CountdownTimer time={time} started={started} />);
    const timeEnded = screen.getByText('Time Ended');
    expect(timeEnded).toBeInTheDocument();
  });

  test('clears interval on unmount', () => {
    const clearIntervalMock = jest.fn();
    global.clearInterval = clearIntervalMock;
    const time = 10;
    const started = Date.now();
    const { unmount } = render(<CountdownTimer time={time} started={started} />);
    unmount();
    expect(clearIntervalMock).toHaveBeenCalled();
  });
});
