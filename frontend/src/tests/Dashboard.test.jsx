import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Dashboard from '../components/Dashboard';
import { MemoryRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Navbar from '../components/Navbar';

configure({ adapter: new Adapter() });

describe('Dashboard component', () => {
  it('checks if the Navbar component exists', () => {
    const dashboard = mount(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(dashboard.find(Navbar).exists()).toEqual(true);
  });

  it('checks if the create new game button exists', () => {
    const dashboard = mount(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    const createNewGameButton = dashboard.find(Button).findWhere((node) => node.text() === 'create new game');
    expect(createNewGameButton.exists()).toEqual(true);
  });
});
