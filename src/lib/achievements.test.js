import { describe, it, expect } from 'vitest';
import { getEarnedAchievements, ACHIEVEMENTS } from './achievements';

describe('ACHIEVEMENTS data', () => {
  it('has exactly 5 entries', () => {
    expect(ACHIEVEMENTS).toHaveLength(5);
  });

  it('each entry has id, emoji, xpRequired, titleKey, descKey', () => {
    ACHIEVEMENTS.forEach(a => {
      expect(a).toHaveProperty('id');
      expect(a).toHaveProperty('emoji');
      expect(a).toHaveProperty('xpRequired');
      expect(a).toHaveProperty('titleKey');
      expect(a).toHaveProperty('descKey');
    });
  });

  it('xpRequired values are sorted ascending', () => {
    const reqs = ACHIEVEMENTS.map(a => a.xpRequired);
    expect(reqs).toEqual([...reqs].sort((a, b) => a - b));
  });
});

describe('getEarnedAchievements()', () => {
  it('returns first_swipe at 0 XP', () => {
    const earned = getEarnedAchievements(0);
    expect(earned.map(a => a.id)).toContain('first_swipe');
  });

  it('returns exactly 1 achievement at 50 XP', () => {
    expect(getEarnedAchievements(50)).toHaveLength(1);
  });

  it('includes chick_stage at exactly 200 XP', () => {
    expect(getEarnedAchievements(200).map(a => a.id)).toContain('chick_stage');
  });

  it('does NOT include chick_stage at 199 XP', () => {
    expect(getEarnedAchievements(199).map(a => a.id)).not.toContain('chick_stage');
  });

  it('returns all 5 achievements at 600 XP', () => {
    expect(getEarnedAchievements(600)).toHaveLength(5);
  });

  it('returns all 5 achievements above 600 XP', () => {
    expect(getEarnedAchievements(999)).toHaveLength(5);
  });
});
