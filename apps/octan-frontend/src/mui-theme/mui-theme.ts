import { createTheme } from '@mui/material';

export const muiTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          // borderRadius: '18px !important',
          color: '#1a1c21',
          background: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: '#0DB774',
          borderColor: '#0DB774',
          ':hover': {
            borderColor: '#0DB774',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          ':disabled': {
            WebkitTextFillColor: '#fff',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { color: '#898989' },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#5B5B5B',
          fontFamily: 'Centra No2',
          border: '1px solid #CECECE',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '22px',
          borderRadius: '4px',
          '&.Mui-selected': {
            color: '#0DB774',
            border: '1px solid #0DB774',
            background: 'transparent',
          },
        },
      },
    },
  },
});
