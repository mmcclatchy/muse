import { createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8aacc8',
      light: '#9be7ff',
      dark: '#2286c3'
    },
    secondary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051'
    },
    warning: {
      main: '#d32f2f',
      light: '#ff6659',
      dark: '#9a0007'
    }
  },
  font: {
    header: `'Sonsie One', cursive`,
    text: `'Montserrat', helvetica, sans-serif`,
  }
  
  
})

export default theme;








  // typography: {
  //   fontFamily: font,
  // },
  // overrides: {
  //   AppBar: {
  //     height: 25
  //   },
  // }