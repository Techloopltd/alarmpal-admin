
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5100 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6200 },
  { month: 'May', revenue: 7300 },
  { month: 'Jun', revenue: 8100 },
];

const RevenueChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500'
            }}
            formatter={(value) => [`$${value}`, 'Revenue']}
            labelStyle={{ color: '#d1d5db' }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#1f2937" 
            strokeWidth={3}
            dot={{ fill: '#1f2937', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#1f2937' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
