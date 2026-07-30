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
  isDark?: boolean;
}

const AccuracyChart: React.FC<AccuracyChartProps> = ({ data, isDark = false }) => {
  // Extract keys dynamically to create lines, excluding 'day'
  const keys = data.length > 0 ? Object.keys(data[0]).filter(k => k !== 'day') : [];
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']; // Blue, Purple, Green, Amber
  const axisColor = isDark ? '#94a3b8' : '#6b7280';
  const gridColor = isDark ? 'rgba(148,163,184,0.15)' : '#e5e7eb';

  return (
    <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 dark:border-white/10 h-[400px]">
       <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 pl-2 border-l-4 border-purple-500">
          Historical Accuracy Trend
        </h3>
        <span className="text-xs text-gray-500 dark:text-slate-400 bg-white/50 dark:bg-white/5 px-2 py-1 rounded">Last 7 Days (Est.)</span>
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
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="day"
              stroke={axisColor}
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[60, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.75rem',
                border: 'none',
                color: isDark ? '#e2e8f0' : '#1f2937',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', color: axisColor }} />
            {keys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                dot={{ r: 4, fill: colors[index % colors.length], strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
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
