import React from 'react';
import { shallow } from 'enzyme';
import LineChartComponent from '../components/LineChartComponent';

const data = [
  {
    question: 'Question 1',
    avgResponseTime: 10,
  },
  {
    question: 'Question 2',
    avgResponseTime: 20,
  },
  {
    question: 'Question 3',
    avgResponseTime: 30,
  },
];

describe('LineChartComponent', () => {
  test('renders line chart with correct data', () => {
    const wrapper = shallow(<LineChartComponent data={data} />);
    expect(wrapper.find('LineChart').exists()).toBe(true);
    expect(wrapper.find('Line').exists()).toBe(true);
  });

  test('renders with correct title', () => {
    const wrapper = shallow(<LineChartComponent data={data} />);
    expect(wrapper.find('text').text()).toBe('Average response time for each question');
  });
});
