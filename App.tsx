import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentForecast from './components/CurrentForecast';
import ComparisonTable from './components/ComparisonTable';
import AccuracyChart from './components/AccuracyChart';
import { fetchWeatherReport } from './services/geminiService';
import { WeatherReport } from './types';

const App: React.FC = () => {
  const [report, setReport] = useState<WeatherReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherReport(term);
      setReport(data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again or check your location.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="py-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight mb-2 text-center">
          WeatherWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI</span>
        </h1>
        <p className="text-gray-600 text-center max-w-xl">
          Aggregating forecasts from top sources to give you the single most accurate prediction powered by Gemini.
        </p>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 border border-red-200 text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {!report && !loading && !error && (
           <div className="text-center text-gray-500 mt-20">
             <div className="mb-4">
               <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
               </svg>
             </div>
             <p className="text-lg">Enter a location above to see the AI consensus forecast.</p>
           </div>
        )}

        {report && (
          <div className="animate-fade-in-up space-y-8">
            <CurrentForecast report={report} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComparisonTable sources={report.sources} />
              <AccuracyChart data={report.accuracyHistory} />
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} WeatherWise AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;