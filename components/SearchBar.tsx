import React, { useState } from 'react';
import { SearchIcon, LocationIcon } from './ui/Icons';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
  recentSearches?: string[];
}

const QUICK_CITIES = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, recentSearches = [] }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSearch(`${position.coords.latitude},${position.coords.longitude}`);
        },
        () => {
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const chips = recentSearches.length > 0 ? recentSearches : QUICK_CITIES;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center shadow-lg rounded-full overflow-hidden bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-white/50 dark:border-white/10 transition-transform focus-within:scale-[1.02]"
      >
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter city or zip code..."
          className="flex-grow px-6 py-4 bg-transparent outline-none text-gray-700 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 text-lg"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleGeoLocation}
          className="p-3 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          title="Use my location"
          disabled={isLoading}
        >
          <LocationIcon className="w-6 h-6" />
        </button>
        <button
          type="submit"
          disabled={isLoading || !term.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Forecast</span>
              <SearchIcon className="w-5 h-5" />
            </div>
          )}
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        {recentSearches.length > 0 && (
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400 mr-1">Recent:</span>
        )}
        {chips.map((city) => (
          <button
            key={city}
            onClick={() => !isLoading && onSearch(city)}
            disabled={isLoading}
            className="text-sm px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 border border-white/40 dark:border-white/10 text-gray-700 dark:text-slate-200 transition-colors disabled:opacity-50"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
