import { describe, it, expect } from 'vitest';
import { t } from './i18n';

describe('t()', () => {
  it('returns English string for known key', () => {
    expect(t('en', 'tab_journey')).toBe('Journey');
  });

  it('returns Czech string for known key', () => {
    expect(t('cz', 'tab_journey')).toBe('Cesta');
  });

  it('falls back to English when CZ key is missing', () => {
    expect(t('cz', 'tab_journey')).not.toBe('tab_journey');
  });

  it('returns the key itself when key is missing in both languages', () => {
    expect(t('en', 'nonexistent_key_xyz')).toBe('nonexistent_key_xyz');
  });

  it('interpolates {{vars}} in the string', () => {
    expect(t('en', 'swipe_progress', { current: 3, total: 18 })).toBe('Card 3 of 18');
  });

  it('interpolates {{vars}} in Czech', () => {
    expect(t('cz', 'swipe_progress', { current: 3, total: 18 })).toBe('Karta 3 z 18');
  });
});
