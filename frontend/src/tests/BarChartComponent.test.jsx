import React from 'react';
import { shallow } from 'enzyme';
import BarChartComponent from '../components/BarChartComponent';

describe('BarChartComponent', () => {
  const data = [
    { question: 'Question 1', percentage: 60 },
    { question: 'Question 2', percentage: 80 },
    { question: 'Question 3', percentage: 40 },
  ];

  it('should render a BarChart', () => {
    const wrapper = shallow(<BarChartComponent data={data} />);
    expect(wrapper.find('BarChart')).toHaveLength(1);
  });

  it('should render a title', () => {
    const wrapper = shallow(<BarChartComponent data={data} />);
    expect(wrapper.find('text').text()).toEqual('Percentage of people who got each question correct');
  });

  it('should render a CartesianGrid', () => {
    const wrapper = shallow(<BarChartComponent data={data} />);
    expect(wrapper.find('CartesianGrid')).toHaveLength(1);
  });

  it('should render an XAxis', () => {
    const wrapper = shallow(<BarChartComponent data={data} />);
    expect(wrapper.find('XAxis')).toHaveLength(1);
  });

  it('should render a YAxis', () => {
    const wrapper = shallow(<BarChartComponent data={data} />);
    expect(wrapper.find('YAxis')).toHaveLength(1);
  });

  it('should render a Tooltip', () => {
    const wrapper = shallow(<BarChartComponent data={data} />);
    expect(wrapper.find('Tooltip')).toHaveLength(1);
  });

  it('should render a Bar', () => {
    const wrapper = shallow(<BarChartComponent data={data} />);
    expect(wrapper.find('Bar')).toHaveLength(1);
  });
});
