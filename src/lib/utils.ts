export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.getFullYear().toString();
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const truncate = (text: string | null, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getResolutionLabel = (width: number, height: number): string => {
  return `${width}x${height}`;
};

export const getAspectRatio = (width: number, height: number): string => {
  const ratio = width / height;
  if (Math.abs(ratio - 0.67) < 0.01) return '2:3';
  if (Math.abs(ratio - 1.5) < 0.01) return '3:2';
  if (Math.abs(ratio - 1.77) < 0.01) return '16:9';
  if (Math.abs(ratio - 1.33) < 0.01) return '4:3';
  if (Math.abs(ratio - 1) < 0.01) return '1:1';
  return `${width}:${height}`;
};

export const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter((c): c is string => typeof c === 'string' && c.length > 0).join(' ');
};

export const generateBlurhash = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@';
  let hash = 'L';
  for (let i = 0; i < 42; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
};