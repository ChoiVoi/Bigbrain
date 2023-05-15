import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SignIn from '../components/SignIn';
import { MemoryRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

configure({ adapter: new Adapter() });

describe('Signin componenet', () => {
  it('check if email input exists', () => {
    const signinForm = mount(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    expect(
      signinForm
        .find('input')
        .findWhere((node) => node.props().name === 'email')
        .exists(),
    ).toEqual(true);
  });

  it('check if password input exists', () => {
    const signinForm = mount(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    expect(
      signinForm
        .find('input')
        .findWhere((node) => node.props().name === 'password')
        .exists(),
    ).toEqual(true);
  });

  it('check if register button text is Register', () => {
    const signinForm = mount(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    expect(
      signinForm
        .find(Button)
        .findWhere((node) => node.text() === 'Register')
        .exists()
    ).toEqual(true);
  });

  it('check if navigating to Sign in button exists', () => {
    const signinForm = mount(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    expect(
      signinForm
        .find(Button)
        .findWhere((node) => node.text() === 'Register')
        .exists()
    ).toEqual(true);
  });
});
