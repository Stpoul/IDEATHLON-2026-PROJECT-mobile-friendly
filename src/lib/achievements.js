export const ACHIEVEMENTS = [
  { id: 'first_swipe', emoji: '👆', xpRequired: 0,   titleKey: 'ach_first_swipe', descKey: 'ach_first_swipe_desc' },
  { id: 'chick_stage', emoji: '🐥', xpRequired: 200, titleKey: 'ach_chick',       descKey: 'ach_chick_desc'       },
  { id: 'halfway',     emoji: '🌟', xpRequired: 300, titleKey: 'ach_halfway',     descKey: 'ach_halfway_desc'     },
  { id: 'fledgling',   emoji: '🐦', xpRequired: 400, titleKey: 'ach_fledgling',   descKey: 'ach_fledgling_desc'   },
  { id: 'champion',    emoji: '⭐', xpRequired: 600, titleKey: 'ach_champion',    descKey: 'ach_champion_desc'    },
];

export function getEarnedAchievements(xp) {
  return ACHIEVEMENTS.filter(a => xp >= a.xpRequired);
}
