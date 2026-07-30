import React from 'react';
import { DailyForecastPoint, Unit } from '../types';
import { getWeatherIcon, DropletIcon } from './ui/Icons';
import { formatTemp } from '../utils/convert';

interface DailyForecastProps {
  data: DailyForecastPoint[];
  unit: Unit;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data, unit }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 dark:border-white/10 mb-8">
      <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-6 pl-2 border-l-4 border-blue-500">5-Day Outlook</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {data.map((day, i) => (
          <div
            key={`${day.day}-${i}`}
            className="flex flex-col items-center gap-2 bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-white/40 dark:border-white/10 hover:-translate-y-1 transition-transform"
          >
            <span className="text-sm font-semibold text-gray-600 dark:text-slate-300">{day.day}</span>
            {getWeatherIcon(day.condition, 'w-8 h-8 text-blue-600 dark:text-blue-300')}
            <div className="flex items-center gap-1 text-sm">
              <span className="font-bold text-gray-800 dark:text-slate-100">{formatTemp(day.high, unit)}</span>
              <span className="text-gray-400 dark:text-slate-500">{formatTemp(day.low, unit)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-300">
              <DropletIcon className="w-3 h-3" />
              {day.precipitationChance}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
