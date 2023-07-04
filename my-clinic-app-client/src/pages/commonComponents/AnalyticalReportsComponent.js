import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticalInfo = ({ data, width, height, barColor }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Analytical Report</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <BarChart width={width} height={height} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill={barColor} />
        </BarChart>
      </div>
    </main>
  );
};

AnalyticalInfo.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      revenue: PropTypes.number.isRequired,
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  barColor: PropTypes.string,
};

AnalyticalInfo.defaultProps = {
  width: 600,
  height: 400,
  barColor: '#8884d8',
};

export default AnalyticalInfo;
