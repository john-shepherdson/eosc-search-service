import { forEach, isArray } from 'lodash-es';
import { IValueWithLabel } from '@collections/repositories/types';

const REGEXP_SPECIAL_CHAR = /[-/]/g;

export const sanitizeValue = (value: string): string =>
  value.replace(/[+\-&|!()"~*?:\\/]/g, (match) => `\\${match.split('')}`);
export const sanitizationReverse = (value: string): string =>
  value.replace(/\\[+\-&|!()"~*?:\\/]/g, (match) => match.replace('\\', ''));

export const toArray = (value: unknown): string[] => {
  if (!value) {
    return [];
  }
  return isArray(value) ? (value as string[]) : [value as string];
};
export const toValueWithLabel = (values: string[]): IValueWithLabel[] => {
  return values.map((value) => ({ label: value, value }));
};

export const queryChanger = (q: string): string => {
  q = q.trim();
  if (q === '*') {
    return q;
  }

  const addFuzzySearchSign = (word: string): string => {
    if (word.length > 5 && (word.includes('/') || word.includes('-'))) {
      const n = `${word}`.replace(REGEXP_SPECIAL_CHAR, ' ');
      const words = n.split(' ');
      words.forEach(function (el, index) {
        if (el.length > 5) {
          words[index] = `${el}~1`;
        } else {
          words[index] = `${el}`;
        }
      });
      return words.join(' ');
    } else if (word.length > 5) {
      return `${word}~1`;
    } else {
      return `${word}`.replace(REGEXP_SPECIAL_CHAR, ' ');
    }
  };

  const words = q.split(' ');
  return words.map(addFuzzySearchSign).join(' ');
};
