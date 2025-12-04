import React, { useState } from 'react';
import { SearchIcon, LocationIcon } from './ui/Icons';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSearch(`${position.coords.latitude},${position.coords.longitude}`);
        },
        (error) => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative flex items-center shadow-lg rounded-full overflow-hidden bg-white/80 backdrop-blur-sm border border-white/50 transition-transform focus-within:scale-[1.02]">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter city or zip code..."
          className="flex-grow px-6 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-500 text-lg"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleGeoLocation}
          className="p-3 text-blue-500 hover:text-blue-700 transition-colors"
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
    </div>
  );
};

export default SearchBar;