import React, { useMemo } from 'react';

interface WeatherBackgroundProps {
  condition?: string;
  isDaytime?: boolean;
}

type Palette = {
  light: string;
  dark: string;
  blobs: string[];
};

const PALETTES: Record<string, Palette> = {
  sunny: {
    light: 'from-sky-300 via-sky-100 to-amber-100',
    dark: 'dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900',
    blobs: ['bg-amber-300/40', 'bg-sky-300/40'],
  },
  cloudy: {
    light: 'from-slate-300 via-slate-200 to-sky-100',
    dark: 'dark:from-slate-900 dark:via-slate-800 dark:to-slate-950',
    blobs: ['bg-slate-400/30', 'bg-sky-300/20'],
  },
  rainy: {
    light: 'from-slate-400 via-sky-200 to-slate-200',
    dark: 'dark:from-slate-950 dark:via-slate-900 dark:to-blue-950',
    blobs: ['bg-blue-400/30', 'bg-slate-400/30'],
  },
  stormy: {
    light: 'from-slate-500 via-slate-400 to-indigo-200',
    dark: 'dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900',
    blobs: ['bg-indigo-400/30', 'bg-slate-500/30'],
  },
  snowy: {
    light: 'from-sky-100 via-white to-blue-50',
    dark: 'dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950',
    blobs: ['bg-white/50', 'bg-sky-200/40'],
  },
  foggy: {
    light: 'from-slate-300 via-slate-200 to-slate-100',
    dark: 'dark:from-slate-800 dark:via-slate-900 dark:to-slate-950',
    blobs: ['bg-slate-400/20', 'bg-slate-300/20'],
  },
};

const resolvePalette = (condition?: string): Palette => {
  const c = (condition || '').toLowerCase();
  if (c.includes('storm') || c.includes('thunder')) return PALETTES.stormy;
  if (c.includes('snow')) return PALETTES.snowy;
  if (c.includes('rain') || c.includes('shower') || c.includes('drizzle')) return PALETTES.rainy;
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return PALETTES.foggy;
  if (c.includes('cloud') || c.includes('overcast')) return PALETTES.cloudy;
  return PALETTES.sunny;
};

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition, isDaytime = true }) => {
  const palette = useMemo(() => resolvePalette(condition), [condition]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${palette.light} ${palette.dark} transition-all duration-1000`}
      />
      <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-float ${palette.blobs[0]}`} />
      <div
        className={`absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl animate-float ${palette.blobs[1]}`}
        style={{ animationDelay: '1.5s' }}
      />
      {!isDaytime && (
        <div className="absolute inset-0 bg-slate-950/30 dark:bg-slate-950/50" />
      )}
    </div>
  );
};

export default WeatherBackground;
