import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AnswerBox from '../components/AnswerBox';

describe('AnswerBox component', () => {
  test('renders without errors', () => {
    render(<AnswerBox />);
  });

  test('renders with correct answer text', () => {
    const answerText = 'Example answer';
    const { getByText } = render(<AnswerBox answer={answerText} />);
    const answerButton = getByText(answerText);
    expect(answerButton).toBeInTheDocument();
  });

  test('applies correct background color', () => {
    const backgroundColor = 'blue';
    const { container } = render(<AnswerBox backgroundColor={backgroundColor} />);
    const answerButton = container.firstChild;
    expect(answerButton).toHaveStyle(`background-color: ${backgroundColor}`);
  });

  test('applies correct style when selected', () => {
    const { container } = render(<AnswerBox selected />);
    const answerButton = container.firstChild;
    expect(answerButton).toHaveStyle('background-color: #ccc');
  });

  test('calls onSelect function when clicked', () => {
    const onSelect = jest.fn();
    const answerText = 'Example answer';
    const { getByText } = render(<AnswerBox answer={answerText} onSelect={onSelect} />);
    const answerButton = getByText(answerText);
    fireEvent.click(answerButton);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(answerText);
  });
});
