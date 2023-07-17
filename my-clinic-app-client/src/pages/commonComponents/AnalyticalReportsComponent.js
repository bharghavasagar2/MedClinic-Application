import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const AnalyticalInfo = ({ initialData, width, height, barColor }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('revenue');

  useEffect(() => {
    // Check if the initial data array is not empty, then set the data state
    if (initialData && Object.keys(initialData).length > 0) {
      setData(initialData);
    }
  }, [initialData]);

  const handleButtonClick = () => {
    // You can fetch new data from the server or update the existing data in some way
    // For example, I'll just reverse the data for demonstration purposes
    setData({ ...data, revenue: data.revenue.reverse() });
  };

  const handleChangeChartType = (type) => {
    setChartType(type);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff69b4', '#bada55'];

  let chart;
  switch (chartType) {
    case 'revenue':
      chart = (
        <BarChart width={width} height={height} data={data.revenue}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill={barColor} />
        </BarChart>
      );
      break;
    case 'departments':
      chart = (
        <PieChart width={width} height={height}>
          <Pie
            data={data.departments}
            dataKey="appointments"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            legendType="circle"
            label
          >
            {data.departments.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      );
      break;
    case 'doctors':
      chart = (
        <PieChart width={width} height={height}>
          <Pie
            data={data.doctors}
            dataKey="appointments"
            nameKey="doctor"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            legendType="circle"
            label
          >
            {data.doctors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Tooltip />
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      );
      break;
    case 'ageGroup':
      chart = (
        <PieChart width={width} height={height}>
          <Pie
            data={data.ageGroup}
            dataKey="appointments"
            nameKey="age_group"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            legendType="circle"
            label
          >
            {data.ageGroup.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      );
      break;
    default:
      chart = null;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Analytical Report</h2>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Render the appropriate chart */}
        {chart}

        {data && Object.keys(data).length > 0 && (
          <div className="mt-4">

            <button onClick={() => handleChangeChartType('revenue')} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
              Monthly Revenue Analysis
            </button>

            <button onClick={() => handleChangeChartType('departments')} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
              Department-wise Appointment Analysis
            </button>

            <button onClick={() => handleChangeChartType('doctors')} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
              Doctor-wise Appointment Analysis
            </button>

            <button onClick={() => handleChangeChartType('ageGroup')} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
              Age Group-wise Appointment Analysis
            </button>
            {/* You can add more buttons or elements here for additional interactivity */}
          </div>
        )}
      </div>
    </main>
  );
};

AnalyticalInfo.propTypes = {
  data: PropTypes.shape({
    revenue: PropTypes.arrayOf(
      PropTypes.shape({
        month: PropTypes.string.isRequired,
        revenue: PropTypes.number.isRequired,
      })
    ),
    departments: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        appointments: PropTypes.number.isRequired,
      })
    ),
    doctors: PropTypes.arrayOf(
      PropTypes.shape({
        doctor: PropTypes.string.isRequired,
        appointments: PropTypes.number.isRequired,
      })
    ),
    ageGroup: PropTypes.arrayOf(
      PropTypes.shape({
        age_group: PropTypes.string.isRequired,
        appointments: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  barColor: PropTypes.string,
};

AnalyticalInfo.defaultProps = {
  width: 600,
  height: 500, // Increased the height of the PieChart for better visibility
  barColor: '#8884d8',
};

export default AnalyticalInfo;
