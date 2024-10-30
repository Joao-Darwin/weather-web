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
      main: '#ffffff',
    },
    background: {
      default: '#E7AD99'
    },
    text: {
      primary: '#000000',
      secondary: '#fffff'
    }
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
      default: '#191919'
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff'
    }
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
