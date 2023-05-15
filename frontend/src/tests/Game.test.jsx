import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Game from '../components/Game';

configure({ adapter: new Adapter() });

describe('Game component', () => {
  const mockNavigate = jest.fn();
  const mockUseParams = jest.fn();

  jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
    useNavigate: jest.fn(),
  }));

  beforeEach(() => {
    mockNavigate.mockReset();
    mockUseParams.mockReturnValue({
      gid: '1',
      sessionId: '2',
    });
  });

  it('renders the Lobby Screen when game is not started', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    expect(wrapper.find('h1').text()).toBe('Lobby Screen');
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('renders the In-game screen when game is started', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    // Click the "Start" button to start the game
    wrapper.find(Button).simulate('click');
    wrapper.update();

    expect(wrapper.find('h1').text()).toContain('Question:');
    expect(wrapper.find(Button)).toHaveLength(2);
  });
});
