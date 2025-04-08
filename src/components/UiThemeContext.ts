import { createContext } from 'react';

export interface UiThemeContextProps {
  theme: null|any,
  setTheme: (mode: 'dark' | 'light') => void,
}

export const UiThemeContext = createContext<UiThemeContextProps>({
  theme: null,
  setTheme: () => {},
});
