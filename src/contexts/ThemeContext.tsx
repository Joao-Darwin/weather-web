import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import React, { createContext, useLayoutEffect, useMemo, useState } from 'react';

interface IThemeContext {
  theme: Theme,
  isDarkMode: boolean,
  toggleTheme: () => void
}

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#E3D985',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#E3D985',
      paper: '#F3F0CE'
    },
    divider: "#000000",
    text: {
      primary: '#000000',
      secondary: '#ffffff'
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#ED6C02',
    },
    info: {
      main: '#0288D1',
    },
    success: {
      main: '#2E7D32',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#191919',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#191919',
      paper: '#333333'
    },
    divider: "#ffffff",
    text: {
      primary: '#ffffff',
      secondary: '#B0BEC5'
    },
    error: {
      main: '#CF6679',
    },
    warning: {
      main: '#FFA000',
    },
    info: {
      main: '#4FC3F7',
    },
    success: {
      main: '#66BB6A',
    },
  },
});


export const ThemeContext = createContext<IThemeContext>({
  theme: lightTheme,
  isDarkMode: false,
  toggleTheme: () => { }
});

interface Props {
  children: React.JSX.Element | React.JSX.Element[]
}

export const CustomThemeProvider = ({ children }: Props): React.JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useLayoutEffect(() => {
    const systemTheme = localStorage.getItem("theme");
    setIsDarkMode(systemTheme == "dark")
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
