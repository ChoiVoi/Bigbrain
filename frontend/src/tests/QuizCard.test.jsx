import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import QuizCard from '../components/QuizCard';
import CardContent from '@material-ui/core/CardContent';
import { MemoryRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

configure({ adapter: new Adapter() });

describe('QuizCard component', () => {
  const quizCardProps = {
    id: '1',
    name: 'Jay',
    owner: 'Jay',
    thumbnail: '',
  };

  // ...other test cases...

  it('renders "No questions yet" when questions array is empty', () => {
    const quizCard = mount(
      <MemoryRouter>
        <QuizCard {...quizCardProps} />
      </MemoryRouter>
    );
    const cardContent = quizCard.find(CardContent);
    expect(cardContent.text()).toContain('No questions yet');
  });

  it('renders "No questions yet" when questions array is empty', () => {
    const quizCard = mount(
      <MemoryRouter>
        <QuizCard {...quizCardProps} />
      </MemoryRouter>
    );
    const cardContent = quizCard.find(CardContent);

    expect(cardContent.text()).toContain('No questions yet');
  });

  it('renders "Start" button when sessionId is not set', () => {
    const quizCard = mount(
      <MemoryRouter>
        <QuizCard {...quizCardProps} />
      </MemoryRouter>
    );
    const startButton = quizCard.find(Button).findWhere((node) => node.text() === 'Start');

    expect(startButton.exists()).toEqual(true);
  });

  it('renders the "Update Quiz" button', () => {
    const quizCard = mount(
      <MemoryRouter>
        <QuizCard {...quizCardProps} />
      </MemoryRouter>
    );
    const updateQuizButton = quizCard.find(Button).findWhere((node) => node.text() === 'Update Quiz');

    expect(updateQuizButton.exists()).toEqual(true);
  });

  it('renders the "Past Results" button', () => {
    const quizCard = mount(
      <MemoryRouter>
        <QuizCard {...quizCardProps} />
      </MemoryRouter>
    );
    const pastResultsButton = quizCard.find(Button).findWhere((node) => node.text() === 'Past Results');

    expect(pastResultsButton.exists()).toEqual(true);
  });

  it('renders the "Delete Quiz" button', () => {
    const quizCard = mount(
      <MemoryRouter>
        <QuizCard {...quizCardProps} />
      </MemoryRouter>
    );
    const deleteQuizButton = quizCard.find(Button).findWhere((node) => node.text() === 'Delete Quiz');

    expect(deleteQuizButton.exists()).toEqual(true);
  });
});
