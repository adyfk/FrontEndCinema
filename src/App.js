import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './styles'
import Layout from './components/layout'
class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>Haiii</Layout>
      </ThemeProvider>
    )
  }
}

export default App
