import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { HistoricalAccuracyPoint } from '../types';

interface AccuracyChartProps {
  data: HistoricalAccuracyPoint[];
}

const AccuracyChart: React.FC<AccuracyChartProps> = ({ data }) => {
  // Extract keys dynamically to create lines, excluding 'day'
  const keys = data.length > 0 ? Object.keys(data[0]).filter(k => k !== 'day') : [];
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']; // Blue, Purple, Green, Amber

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 h-[400px]">
       <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 pl-2 border-l-4 border-purple-500">
          Historical Accuracy Trend
        </h3>
        <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded">Last 7 Days (Est.)</span>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280" 
              tick={{fill: '#4b5563', fontSize: 12}} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{fill: '#4b5563', fontSize: 12}} 
              axisLine={false}
              tickLine={false}
              domain={[60, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '0.75rem', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {keys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                dot={{ r: 4, fill: colors[index % colors.length], strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AccuracyChart;