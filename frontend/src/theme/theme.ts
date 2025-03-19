import { createTheme, ThemeOptions } from '@mui/material';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6F00',
    },
    secondary: {
      main: '#FF4081',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
};

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme(mode === 'light' ? lightTheme : darkTheme);
