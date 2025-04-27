import React, { createContext, useContext } from 'react';
import { theme } from './index';

const ThemeContext = createContext(theme);

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}