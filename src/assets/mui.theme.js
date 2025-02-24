import { Colors } from '../utils/constants';
import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = () =>
  responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: Colors.DarkBrown,
          dark: Colors.SoftBeige,
          light: Colors.White,
        },
        secondary: {
          main: Colors.Green,
          light: Colors.White,
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
      },
      typography: {
        fontFamily: 'Raleway, sans-serif',
        body2: {
          fontFamily: 'Red Hat Text, sans-serif',
        },
        caption: {
          fontFamily: 'Abril Fatface, serif',
        },
      },
      components: {
        MuiAccordion: {
          styleOverrides: {
            root: ({ theme }) => ({
              boxShadow: 'none',
              borderRadius: '0',
              color: theme.palette.primary.main,

              '&:first-of-type': {
                '&::before': {
                  display: 'none !important',
                },
              },
              '&:not(:last-child)': {
                borderBottom: 0,
              },
              '&::before': {
                display: 'block !important',
                backgroundColor: theme.palette.primary.dark,
              },
              '&.Mui-expanded': {
                margin: 0,

                '&::before': {
                  opacity: 1,
                },
              },
            }),
          },
        },
        MuiAccordionSummary: {
          styleOverrides: {
            root: {
              padding: '8px 0',
              fontSize: '1rem',
              lineHeight: '1.5rem',

              '&.Mui-expanded': {
                minHeight: 'unset',
              },
              '.MuiAccordionSummary-content': {
                '&.Mui-expanded': {
                  margin: '12px 0',
                },
              },
            },
          },
        },
        MuiAccordionDetails: {
          styleOverrides: {
            root: {
              padding: '16px',
              paddingTop: 0,
            },
          },
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: ({ theme }) => ({
              fontFamily: theme.typography.fontFamily,
            }),
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: ({ theme }) => ({
              '& .MuiOutlinedInput-root': {
                fontFamily: theme.typography.body2.fontFamily,

                '& fieldset': {
                  borderColor: theme.palette.primary.dark,
                  transition: '0.2s',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.primary.dark,
              },
            }),
          },
        },
        MuiButton: {
          styleOverrides: {
            contained: {
              fontWeight: 700,
            },
            outlined: ({ theme }) => ({
              borderColor: theme.palette.secondary.main,
              fontWeight: 700,
            }),
          },
        },
        MuiTypography: {
          styleOverrides: {
            root: ({ theme }) => ({
              color: theme.palette.primary.main,
            }),
          },
        },
        MuiListItemIcon: {
          styleOverrides: {
            root: ({ theme }) => ({
              color: theme.palette.primary.main,
              minWidth: '1.5rem',
            }),
          },
        },
        MuiListItemText: {
          styleOverrides: {
            root: ({ theme }) => ({
              color: theme.palette.primary.main,
              fontFamily: theme.typography.fontFamily,
            }),
          },
        },
        MuiFormControl: {
          styleOverrides: {
            root: ({ theme }) => ({
              '& .MuiInputLabel-root': {
                color: theme.palette.primary.dark,
              },
            }),
          },
        },
        MuiSelect: {
          styleOverrides: {
            root: ({ theme }) => ({
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.dark,
                transition: '0.2s',

                '&:hover': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }),
          },
        },
      },
    })
  );

export default theme;
