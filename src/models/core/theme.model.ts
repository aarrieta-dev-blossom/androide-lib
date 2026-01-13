export interface ThemeColors {
    primary: string;
    accent: string;
    warn: string;
    isDark: boolean;
}

export const DEFAULT_THEMES: Record<string, ThemeColors> = {
    'indigo-light': { primary: '#3949ab', accent: '#ff4081', warn: '#f44336', isDark: false },
    'teal-light': { primary: '#00796b', accent: '#ff4081', warn: '#f44336', isDark: false },
    'red-light': { primary: '#c62828', accent: '#ff4081', warn: '#f44336', isDark: false },
    'blue-dark': { primary: '#0277bd', accent: '#ffc107', warn: '#ff5252', isDark: true },
    'green-dark': { primary: '#2e7d32', accent: '#ffc107', warn: '#ff5252', isDark: true },
    'pink-dark': { primary: '#c2185b', accent: '#ffc107', warn: '#ff5252', isDark: true },
};
