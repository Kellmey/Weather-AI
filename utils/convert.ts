import { Unit } from '../types';

export const convertTemp = (celsius: number, unit: Unit): number => {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
};

export const formatTemp = (celsius: number, unit: Unit): string => `${convertTemp(celsius, unit)}°${unit}`;
