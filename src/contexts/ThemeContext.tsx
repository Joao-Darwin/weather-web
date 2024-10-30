import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import React, { createContext, useMemo, useState } from 'react';

interface IThemeContext {
  theme: Theme,
  isDarkMode: boolean,
  toggleTheme: () => void
}

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#E7AD99',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#E7AD99',
      paper: '#F4E8E1'
    },
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
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
