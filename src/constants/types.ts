export type ThemeMode = 'light' | 'dark' | 'system';

export type Theme = {
  mode: 'light' | 'dark';
  colors: {
    background: string;
    text: string;
    card: string;
    primary: string;
  };
};