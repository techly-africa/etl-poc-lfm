// Design tokens — ETL Body Reset
// Single source of truth.

export interface TokenStyle {
  size: number;
  weight: number;
  lh: number;
  ls: number;
}

export interface DesignTokens {
  color: { [key: string]: string };
  font: {
    family: string;
    h1: TokenStyle;
    h2: TokenStyle;
    h3: TokenStyle;
    h4: TokenStyle;
    body: TokenStyle;
    bodyM: TokenStyle;
    small: TokenStyle;
    label: TokenStyle;
    overline: TokenStyle;
  };
  radius: { [key: string]: number };
  space: (n: number) => number;
  shadow: { [key: string]: string };
}

export const ETL: DesignTokens = {
  color: {
    primary: '#2D6A4F',      // deep forest
    primaryDark: '#1F4D3A',
    primaryLight: '#3F8A68',
    secondary: '#F4A261',    // warm orange
    secondaryDark: '#E08A41',
    tertiary: '#E9F5EF',     // soft mint
    tertiaryDeep: '#D6EBE0',
    neutral: '#1B1B1B',
    neutral80: '#3A3A3A',
    neutral60: '#6B6B6B',
    neutral40: '#A8A8A8',
    neutral20: '#DCDCDA',
    neutral10: '#EDEDEA',
    surface: '#F7F7F5',
    white: '#FFFFFF',
    success: '#2D6A4F',
    locked: '#9CA8A1',
  },
  font: {
    family: '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    h1: { size: 32, weight: 700, lh: 1.15, ls: -0.6 },
    h2: { size: 24, weight: 700, lh: 1.2,  ls: -0.4 },
    h3: { size: 20, weight: 600, lh: 1.25, ls: -0.3 },
    h4: { size: 17, weight: 600, lh: 1.3,  ls: -0.2 },
    body: { size: 15, weight: 400, lh: 1.5, ls: -0.1 },
    bodyM: { size: 15, weight: 500, lh: 1.5, ls: -0.1 },
    small: { size: 13, weight: 500, lh: 1.4, ls: 0 },
    label: { size: 12, weight: 600, lh: 1.3, ls: 0.4 },
    overline: { size: 11, weight: 600, lh: 1.2, ls: 0.8 },
  },
  radius: { sm: 8, md: 14, lg: 20, xl: 28, full: 999 },
  space: (n: number) => n * 4,
  shadow: {
    sm: '0 1px 2px rgba(27,27,27,0.04), 0 1px 3px rgba(27,27,27,0.06)',
    md: '0 2px 4px rgba(27,27,27,0.04), 0 8px 16px rgba(27,27,27,0.06)',
    lg: '0 4px 12px rgba(27,27,27,0.06), 0 16px 32px rgba(27,27,27,0.08)',
    glow: '0 4px 16px rgba(45,106,79,0.25)',
  },
};

// Typography helpers — apply a token style on any element.
export const tStyle = (key: keyof DesignTokens['font']) => {
  if (key === 'family') return { fontFamily: ETL.font.family };
  const t = ETL.font[key] as TokenStyle;
  return {
    fontFamily: ETL.font.family,
    fontSize: t.size,
    fontWeight: t.weight,
    lineHeight: t.lh,
    letterSpacing: `${t.ls}px`,
  };
};
