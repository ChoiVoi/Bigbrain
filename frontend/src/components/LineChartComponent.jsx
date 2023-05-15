import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function LineChartComponent ({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 40, right: 20, left: 20, bottom: 20 }}>
        <text x="50%" y="20" textAnchor="middle" dominantBaseline="middle" fontSize="1.2rem">
          Average response time for each question
        </text>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="question" padding={{ left: 30, right: 30 }} label={{ value: 'Question', position: 'insideBottom', offset: -5 }} interval={0}/>
        <YAxis
          label={{
            value: 'Seconds',
            angle: -90,
            position: 'insideLeft',
            offset: 0,
            style: { textAnchor: 'middle' },
          }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="avgResponseTime" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;
