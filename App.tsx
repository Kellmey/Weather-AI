import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentForecast from './components/CurrentForecast';
import ComparisonTable from './components/ComparisonTable';
import AccuracyChart from './components/AccuracyChart';
import DailyForecast from './components/DailyForecast';
import LoadingSkeleton from './components/LoadingSkeleton';
import ThemeToggle from './components/ThemeToggle';
import UnitToggle from './components/UnitToggle';
import WeatherBackground from './components/WeatherBackground';
import { fetchWeatherReport } from './services/geminiService';
import { Unit, WeatherReport } from './types';

const THEME_KEY = 'weatherwise-theme';
const UNIT_KEY = 'weatherwise-unit';
const RECENTS_KEY = 'weatherwise-recent-searches';
const MAX_RECENTS = 5;

const getInitialTheme = (): boolean => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored === 'dark';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
};

const getInitialRecents = (): string[] => {
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const App: React.FC = () => {
  const [report, setReport] = useState<WeatherReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [unit, setUnit] = useState<Unit>(() => (localStorage.getItem(UNIT_KEY) as Unit) || 'C');
  const [recentSearches, setRecentSearches] = useState<string[]>(getInitialRecents);
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem(UNIT_KEY, unit);
  }, [unit]);

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    setLastQuery(term);
    try {
      const data = await fetchWeatherReport(term);
      setReport(data);
      setRecentSearches((prev) => {
        const next = [term, ...prev.filter((c) => c.toLowerCase() !== term.toLowerCase())].slice(0, MAX_RECENTS);
        localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
        return next;
      });
    } catch (err) {
      setError('Failed to fetch weather data. Please try again or check your location.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <WeatherBackground condition={report?.bestForecast.snapshot.condition} isDaytime={report?.isDaytime ?? true} />

      <header className="py-8 flex flex-col items-center relative">
        <div className="absolute right-0 top-8 flex items-center gap-2">
          <UnitToggle unit={unit} onChange={setUnit} />
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-white tracking-tight mb-2 text-center">
          WeatherWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">AI</span>
        </h1>
        <p className="text-gray-600 dark:text-slate-300 text-center max-w-xl">
          Aggregating forecasts from top sources to give you the single most accurate prediction powered by Gemini.
        </p>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} isLoading={loading} recentSearches={recentSearches} />

        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 p-4 rounded-xl mb-8 border border-red-200 dark:border-red-500/20 text-center max-w-2xl mx-auto">
            <p className="mb-3">{error}</p>
            {lastQuery && (
              <button
                onClick={() => handleSearch(lastQuery)}
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {loading && <LoadingSkeleton />}

        {!report && !loading && !error && (
           <div className="text-center text-gray-500 dark:text-slate-400 mt-20">
             <div className="mb-4">
               <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
               </svg>
             </div>
             <p className="text-lg">Enter a location above to see the AI consensus forecast.</p>
           </div>
        )}

        {report && !loading && (
          <div className="animate-fade-in-up space-y-8">
            <CurrentForecast report={report} unit={unit} />
            <DailyForecast data={report.dailyForecast} unit={unit} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComparisonTable sources={report.sources} unit={unit} />
              <AccuracyChart data={report.accuracyHistory} isDark={isDark} />
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 text-center text-gray-500 dark:text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} WeatherWise AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
