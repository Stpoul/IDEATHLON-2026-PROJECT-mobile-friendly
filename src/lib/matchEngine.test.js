import { describe, it, expect } from 'vitest';
import { calcMatch, PATHWAYS } from './matchEngine';

describe('calcMatch()', () => {
  it('returns 50 when swipeResults is empty', () => {
    const pathway = PATHWAYS.find(p => p.id === 'tul-engineering');
    expect(calcMatch(pathway, {})).toBe(50);
  });

  it('returns 100 when every weighted category is 100% liked', () => {
    const pathway = PATHWAYS.find(p => p.id === 'tul-engineering');
    const results = {
      Technical: { liked: 5, total: 5 },
      Science: { liked: 5, total: 5 },
      Logic: { liked: 5, total: 5 },
    };
    expect(calcMatch(pathway, results)).toBe(100);
  });

  it('returns 0 when every weighted category is 0% liked', () => {
    const pathway = PATHWAYS.find(p => p.id === 'tul-engineering');
    const results = {
      Technical: { liked: 0, total: 5 },
      Science: { liked: 0, total: 5 },
      Logic: { liked: 0, total: 5 },
    };
    expect(calcMatch(pathway, results)).toBe(0);
  });

  it('ignores irrelevant categories', () => {
    const pathway = PATHWAYS.find(p => p.id === 'creative-arts');
    const results = {
      Technical: { liked: 5, total: 5 },
      Creative: { liked: 0, total: 2 },
      Social: { liked: 0, total: 2 },
    };
    expect(calcMatch(pathway, results)).toBe(0);
  });

  it('PATHWAYS contains exactly 6 entries', () => {
    expect(PATHWAYS).toHaveLength(6);
  });

  it('each pathway has id, type, emoji, name, weights, pros, cons, steps', () => {
    PATHWAYS.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('type');
      expect(p).toHaveProperty('emoji');
      expect(p.name).toHaveProperty('en');
      expect(p.name).toHaveProperty('cz');
      expect(p).toHaveProperty('weights');
      expect(p.pros).toHaveProperty('en');
      expect(p.cons).toHaveProperty('en');
      expect(p.steps).toHaveProperty('en');
      expect(p.steps).toHaveProperty('cz');
    });
  });

  it('each pathway steps has at least 3 items per language', () => {
    PATHWAYS.forEach(p => {
      expect(p.steps.en.length).toBeGreaterThanOrEqual(3);
      expect(p.steps.cz.length).toBeGreaterThanOrEqual(3);
    });
  });
});
