import { createMuiTheme } from '@material-ui/core/styles';


const font = `'Montserrat', helvetica, sans-serif`;

const theme = createMuiTheme({
  palette: {
    dark: {
      background: '#424242',
      color: '#f2f2f2',
      primary: {
        main: '#90caf9',
        light: '#c3fdff',
        dark: '#5e92f3'
      },
      secondary: {
        main: '#1565c0',
        light: '#5e92f3',
        dark: '#003c8f'
      },
      
    },
    light: {
      background: '#f2f2f2',
      color: '#1b1b1b',
      primary: {
        main: '#90caf9',
        light: '#c3fdff',
        dark: '#5e92f3'
      },
      secondary: {
        main: '#1565c0',
        light: '#5e92f3',
        dark: '#003c8f'
      },
      
    },
  },
  typography: {
    fontFamily: font,
  },
  overrides: {
    AppBar: {
      height: 25
    },
  }
})

export default theme;