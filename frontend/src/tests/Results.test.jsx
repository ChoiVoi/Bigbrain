import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Results from '../components/Results';
import BarChartComponent from '../components/BarChartComponent.jsx';
import LineChartComponent from '../components/LineChartComponent.jsx';
import { waitFor } from '@testing-library/react';

// Mock the 'apiCall' function from the App component
jest.mock('../App', () => ({
  apiCall: jest.fn(),
}));

// Mock the 'useParams' and 'useNavigate' hooks from 'react-router-dom'
jest.mock('react-router-dom', () => ({
  useParams: () => ({ sessionId: '1', gid: '1' }),
  useNavigate: () => jest.fn(),
}));

describe('<Results />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    shallow(<Results />);
  });

  it('renders the BarChartComponent and LineChartComponent', async () => {
    const wrapper = shallow(<Results />);
    await act(async () => {
      await Promise.resolve(wrapper);
      await waitFor(() => wrapper.update());
      wrapper.update();
    });

    expect(wrapper.find(BarChartComponent).length).toBe(1);
    expect(wrapper.find(LineChartComponent).length).toBe(1);
  });
});
