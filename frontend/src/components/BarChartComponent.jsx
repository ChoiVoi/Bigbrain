import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function BarChartComponent ({ data }) {
  const tooltipFormatter = (value, name, props) => {
    return '';
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 40, right: 20, left: 20, bottom: 20 }}>
        <text x="50%" y="20" textAnchor="middle" dominantBaseline="middle" fontSize="1.2rem">
          Percentage of people who got each question correct
        </text>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="question" label={{ value: 'Question', position: 'insideBottom', offset: -5 }} interval={0} />
        <YAxis
          label={{
            value: '%',
            angle: -90,
            position: 'insideLeft',
            offset: 0,
            style: { textAnchor: 'middle' },
          }}
        />
        <Tooltip formatter={tooltipFormatter} />
        <Bar dataKey="percentage" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
