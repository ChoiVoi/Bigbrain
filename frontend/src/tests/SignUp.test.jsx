import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SignUp from '../components/SignUp';
import { MemoryRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

configure({ adapter: new Adapter() });

describe('Signup componenet', () => {
  it('check if name input exists', () => {
    const registrationForm = mount(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(
      registrationForm
        .find('input')
        .findWhere((node) => node.props().name === 'name')
        .exists(),
    ).toEqual(true);
  });

  it('check if name input exists', () => {
    const registrationForm = mount(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(
      registrationForm
        .find('input')
        .findWhere((node) => node.props().name === 'email')
        .exists(),
    ).toEqual(true);
  });

  it('check if password input exists', () => {
    const registrationForm = mount(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(
      registrationForm
        .find('input')
        .findWhere((node) => node.props().name === 'password')
        .exists(),
    ).toEqual(true);
  });

  it('check if register button text is Register', () => {
    const registrationForm = mount(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(
      registrationForm
        .find(Button)
        .findWhere((node) => node.text() === 'Register')
        .exists()
    ).toEqual(true);
  });

  it('check if navigating to Sign in button exists', () => {
    const registrationForm = mount(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(
      registrationForm
        .find(Button)
        .findWhere((node) => node.text() === 'Sign in')
        .exists()
    ).toEqual(true);
  });
});
