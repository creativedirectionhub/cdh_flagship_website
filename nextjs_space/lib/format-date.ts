// Safe date formatting utility to avoid hydration mismatches
// Uses UTC to ensure consistent output between server and client

export function formatDate(date: Date | string | null | undefined, format: 'short' | 'long' = 'short'): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Use UTC to avoid timezone differences between server and client
  const month = format === 'long' ? monthsFull[d.getUTCMonth()] : months[d.getUTCMonth()];
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  
  return `${month} ${day}, ${year}`;
}

export function getCurrentYear(): number {
  // Fixed year for SSR consistency - update yearly or use dynamic approach
  return 2026;
}
