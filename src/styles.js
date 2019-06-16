import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffeb3b'
    },
    secondary: {
      light: '#ffff72',
      main: '#ffeb3b',
      dark: '#c8b900',
      contrastText: '#000000'
    }
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'capitalize'
      }
    }
  }
})
export default theme
