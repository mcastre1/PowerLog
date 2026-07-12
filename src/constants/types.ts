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

declare global {
  // You can name this whatever you want
  var __workoutsDB__: {
    instance: import("expo-sqlite").SQLiteDatabase | null;
    initializing: boolean;
  } | undefined;
}

export { };

