import React from 'react';
import { Unit } from '../types';

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onChange }) => {
  return (
    <div className="flex items-center bg-white/50 dark:bg-white/10 border border-white/50 dark:border-white/10 rounded-full p-1 backdrop-blur-sm shadow-sm text-sm font-semibold">
      {(['C', 'F'] as Unit[]).map((u) => (
        <button
          key={u}
          onClick={() => onChange(u)}
          className={`w-8 h-8 rounded-full transition-colors ${
            unit === u
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10'
          }`}
        >
          °{u}
        </button>
      ))}
    </div>
  );
};

export default UnitToggle;
