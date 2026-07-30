export type Unit = 'C' | 'F';

export interface WeatherSnapshot {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  unit: 'C';
}

export interface WeatherSource {
  name: string;
  data: WeatherSnapshot;
  confidenceScore: number; // 0-100
}

export interface HistoricalAccuracyPoint {
  day: string;
  [key: string]: number | string; // Allows dynamic source names mapped to scores
}

export interface DailyForecastPoint {
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitationChance: number; // 0-100
}

export interface WeatherReport {
  location: string;
  isDaytime: boolean;
  bestForecast: {
    snapshot: WeatherSnapshot;
    summary: string;
    reasoning: string;
  };
  sources: WeatherSource[];
  accuracyHistory: HistoricalAccuracyPoint[];
  dailyForecast: DailyForecastPoint[];
  lastUpdated: string;
  isDemo?: boolean;
}

export enum WeatherCondition {
  Sunny = 'Sunny',
  Cloudy = 'Cloudy',
  Rainy = 'Rainy',
  Stormy = 'Stormy',
  Snowy = 'Snowy',
  Foggy = 'Foggy',
  Clear = 'Clear'
}
