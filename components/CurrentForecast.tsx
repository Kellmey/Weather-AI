import React from 'react';
import { WeatherReport } from '../types';
import { getWeatherIcon } from './ui/Icons';

interface CurrentForecastProps {
  report: WeatherReport;
}

const CurrentForecast: React.FC<CurrentForecastProps> = ({ report }) => {
  const { bestForecast, location } = report;
  const { snapshot, summary, reasoning } = bestForecast;

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 text-gray-800 mb-8 transform transition-all hover:shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{location}</h2>
          <p className="text-blue-700 font-medium opacity-80 mt-1">Today's Best Forecast (AI Consensus)</p>
        </div>
        <div className="bg-blue-100/50 px-4 py-2 rounded-full text-blue-800 text-sm font-semibold mt-4 md:mt-0 border border-blue-200">
          Updated: {new Date(report.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex items-center justify-center bg-blue-500/10 rounded-full p-6 w-32 h-32 md:w-40 md:h-40">
           {getWeatherIcon(snapshot.condition, "w-20 h-20 md:w-24 md:h-24 text-blue-600")}
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <div className="text-6xl md:text-7xl font-bold text-blue-900 tracking-tighter">
            {snapshot.temp}°{snapshot.unit}
          </div>
          <p className="text-xl md:text-2xl font-medium text-gray-700 mt-2">{snapshot.condition}</p>
          <p className="text-gray-600 mt-1">{summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-white/60 p-4 rounded-xl shadow-sm text-center border border-white/40">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Humidity</p>
            <p className="text-xl font-bold text-gray-800">{snapshot.humidity}%</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl shadow-sm text-center border border-white/40">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Wind</p>
            <p className="text-xl font-bold text-gray-800">{snapshot.windSpeed} <span className="text-sm font-normal">km/h</span></p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50/80 p-5 rounded-xl border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex-shrink-0">
             <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"/></svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 text-sm uppercase">AI Reasoning</h4>
            <p className="text-gray-700 text-sm leading-relaxed mt-1">{reasoning}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentForecast;