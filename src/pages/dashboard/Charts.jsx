import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  { date: '10 Jan 2025', sales: 0 },
  { date: '11 Jan 2025', sales: 0 },
  { date: '12 Jan 2025', sales: 0 },
  { date: '13 Jan 2025', sales: 0 },
  { date: '14 Jan 2025', sales: 0 },
  { date: '15 Jan 2025', sales: 0 },
  { date: '16 Jan 2025', sales: 0 },
  { date: '17 Jan 2025', sales: 0 },
  { date: '18 Jan 2025', sales: 0 },
  { date: '19 Jan 2025', sales: 0 },
  { date: '20 Jan 2025', sales: 0 },
  { date: '21 Jan 2025', sales: 0 },
  { date: '22 Jan 2025', sales: 0 },
  { date: '23 Jan 2025', sales: 0 },
  { date: '24 Jan 2025', sales: 0 },
  { date: '25 Jan 2025', sales: 0 },
  { date: '26 Jan 2025', sales: 0 },
  { date: '27 Jan 2025', sales: 0 },
  { date: '28 Jan 2025', sales: 0 },
  { date: '29 Jan 2025', sales: 0 },
  { date: '30 Jan 2025', sales: 0 },
  { date: '31 Jan 2025', sales: 0 },
  { date: '1 Feb 2025', sales: 0 },
  { date: '2 Feb 2025', sales: 0 },
  { date: '3 Feb 2025', sales: 0 },
  { date: '4 Feb 2025', sales: 0 },
  { date: '5 Feb 2025', sales: 0 },
  { date: '6 Feb 2025', sales: 0 },
  { date: '7 Feb 2025', sales: 0 },
  { date: '8 Feb 2025', sales: 0 }
];

const DashboardChart = () => {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-primary">Sales Last 30 Days</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#007bff" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
