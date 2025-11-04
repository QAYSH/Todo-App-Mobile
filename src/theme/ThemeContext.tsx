// src/theme/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeColors {
  background: string;
  todoBackground: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  completed: string;
}

interface Theme {
  colors: ThemeColors;
}

const lightTheme: Theme = {
  colors: {
    background: '#fafafa',
    todoBackground: '#ffffff',
    text: '#484b6a',
    textSecondary: '#9394a5',
    border: '#e4e5f1',
    shadow: 'rgba(0, 0, 0, 0.1)',
    completed: '#d2d3db',
  }
};

const darkTheme: Theme = {
  colors: {
    background: '#181824',
    todoBackground: '#25273c',
    text: '#c8cae3',
    textSecondary: '#777a92',
    border: '#393a4c',
    shadow: 'rgba(0, 0, 0, 0.3)',
    completed: '#4d5066',
  }
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};