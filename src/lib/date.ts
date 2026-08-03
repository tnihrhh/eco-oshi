export function daysUntil(isoDate: string): number {
  const target = new Date(`${isoDate}T23:59:59`);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDateJp(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
