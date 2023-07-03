import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticalInfo = () => {
  const data = [
    { month: 'Jan', revenue: 1500 },
    { month: 'Feb', revenue: 2100 },
    { month: 'Mar', revenue: 1800 },
    { month: 'Apr', revenue: 2200 },
    { month: 'May', revenue: 2800 },
    { month: 'Jun', revenue: 3200 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">Analytical Report</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <BarChart width={600} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </div>
      </main>
    </div>
  );
};

export default AnalyticalInfo;
