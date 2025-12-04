import React from 'react';
import { WeatherSource } from '../types';
import { getWeatherIcon } from './ui/Icons';

interface ComparisonTableProps {
  sources: WeatherSource[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ sources }) => {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 mb-8 overflow-hidden">
      <h3 className="text-xl font-bold text-gray-800 mb-6 pl-2 border-l-4 border-blue-500">Source Comparison</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200/50">
              <th className="text-left py-4 px-4 text-gray-500 font-medium text-sm">Provider</th>
              <th className="text-center py-4 px-4 text-gray-500 font-medium text-sm">Condition</th>
              <th className="text-center py-4 px-4 text-gray-500 font-medium text-sm">Temp</th>
              <th className="text-center py-4 px-4 text-gray-500 font-medium text-sm">Humidity</th>
              <th className="text-center py-4 px-4 text-gray-500 font-medium text-sm">Wind</th>
              <th className="text-center py-4 px-4 text-gray-500 font-medium text-sm">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr key={source.name} className="hover:bg-blue-50/30 transition-colors group">
                <td className="py-4 px-4 font-semibold text-gray-800">{source.name}</td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    {getWeatherIcon(source.data.condition, "w-5 h-5 text-gray-600")}
                    <span className="text-sm text-gray-600">{source.data.condition}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center font-bold text-gray-700">{source.data.temp}°{source.data.unit}</td>
                <td className="py-4 px-4 text-center text-gray-600">{source.data.humidity}%</td>
                <td className="py-4 px-4 text-center text-gray-600">{source.data.windSpeed} km/h</td>
                <td className="py-4 px-4 text-center">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
                    {source.confidenceScore}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;