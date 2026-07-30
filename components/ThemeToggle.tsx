import React from 'react';
import { SunIcon, MoonIcon } from './ui/Icons';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2.5 rounded-full bg-white/50 dark:bg-white/10 border border-white/50 dark:border-white/10 text-gray-700 dark:text-slate-200 hover:scale-105 transition-transform shadow-sm backdrop-blur-sm"
    >
      {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
