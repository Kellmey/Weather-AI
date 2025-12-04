export interface WeatherSnapshot {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  unit: 'C' | 'F';
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

export interface WeatherReport {
  location: string;
  bestForecast: {
    snapshot: WeatherSnapshot;
    summary: string;
    reasoning: string;
  };
  sources: WeatherSource[];
  accuracyHistory: HistoricalAccuracyPoint[];
  lastUpdated: string;
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