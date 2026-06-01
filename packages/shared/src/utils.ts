export const getFlagUrl = (isoCode: string) => {
  return `https://flagcdn.com/w40/${isoCode.toLowerCase().substring(0, 2)}.png`;
};

/**
 * Utility for joining tailwind classes safely
 * (Simplified for now, can add clsx/tailwind-merge later if needed)
 */
export function cn(...classes: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return classes
    .filter(Boolean)
    .map(c => {
      if (typeof c === 'object') {
        return Object.entries(c!)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return c;
    })
    .join(' ');
}
