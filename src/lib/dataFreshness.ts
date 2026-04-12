export const CURRENT_TAX_YEAR = new Date().getFullYear();
export const DATA_LAST_UPDATED_ISO = '2026-01-15T00:00:00.000Z';

export function isStale(now: Date = new Date()): boolean {
  const updated = new Date(DATA_LAST_UPDATED_ISO);
  const msInDay = 24 * 60 * 60 * 1000;
  const daysSinceUpdate = Math.floor((now.getTime() - updated.getTime()) / msInDay);
  if (now.getFullYear() > CURRENT_TAX_YEAR) return true;
  if (daysSinceUpdate > 370) return true;
  return false;
}

export function freshnessBadgeText(): string {
  const updated = new Date(DATA_LAST_UPDATED_ISO);
  const month = updated.toLocaleString('en-US', { month: 'short' });
  const day = updated.getDate();
  const year = updated.getFullYear();
  if (isStale()) return `Tax data outdated — updates pending`;
  return `Tax data updated ${month} ${day}, ${year}`;
}

