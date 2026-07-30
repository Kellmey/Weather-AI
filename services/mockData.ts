import { WeatherReport } from '../types';

// Small deterministic PRNG so the same location produces stable demo data
// within a session, instead of jumping around on every keystroke/re-render.
const seededRandom = (seed: string) => {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
};

const CONDITIONS = ['Sunny', 'Clear', 'Cloudy', 'Rainy', 'Stormy', 'Snowy', 'Foggy'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SOURCE_NAMES = ['OpenWeatherMap', 'WeatherAPI', 'AccuWeather'];

const pick = <T,>(rand: () => number, arr: T[]): T => arr[Math.floor(rand() * arr.length)];

export const generateDemoReport = (location: string): WeatherReport => {
  const rand = seededRandom(location.toLowerCase().trim());
  const baseTemp = Math.round(rand() * 30 - 5); // -5 to 25
  const condition = pick(rand, CONDITIONS);
  const isDaytime = rand() > 0.3;

  const sources = SOURCE_NAMES.map((name) => {
    const drift = Math.round((rand() - 0.5) * 6);
    return {
      name,
      data: {
        temp: baseTemp + drift,
        condition: pick(rand, CONDITIONS),
        humidity: Math.round(40 + rand() * 50),
        windSpeed: Math.round(2 + rand() * 25),
        unit: 'C' as const,
      },
      confidenceScore: Math.round(70 + rand() * 28),
    };
  });

  const todayIdx = new Date().getDay();
  const accuracyHistory = Array.from({ length: 7 }, (_, i) => {
    const day = DAYS[(todayIdx + i) % 7];
    const point: Record<string, number | string> = { day };
    SOURCE_NAMES.forEach((name) => {
      point[name] = Math.round(65 + rand() * 33);
    });
    return point as WeatherReport['accuracyHistory'][number];
  });

  const dailyForecast = Array.from({ length: 5 }, (_, i) => {
    const day = i === 0 ? 'Today' : DAYS[(todayIdx + i) % 7];
    const high = baseTemp + Math.round(rand() * 4);
    return {
      day,
      high,
      low: high - Math.round(3 + rand() * 6),
      condition: pick(rand, CONDITIONS),
      precipitationChance: Math.round(rand() * 100),
    };
  });

  return {
    location: location
      .split(',')
      .map((s) => s.trim())
      .join(', ') || 'Unknown Location',
    isDaytime,
    bestForecast: {
      snapshot: { temp: baseTemp, condition, humidity: sources[0].data.humidity, windSpeed: sources[0].data.windSpeed, unit: 'C' },
      summary: `${condition} with ${sources[0].data.windSpeed > 15 ? 'brisk' : 'gentle'} winds`,
      reasoning: 'Demo mode: this is simulated sample data shown because no Gemini API key is configured. Add GEMINI_API_KEY in .env.local to get live AI-aggregated forecasts.',
    },
    sources,
    accuracyHistory,
    dailyForecast,
    lastUpdated: new Date().toISOString(),
    isDemo: true,
  };
};
