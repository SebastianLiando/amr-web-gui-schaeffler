import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app/app'
import reportWebVitals from './reportWebVitals'

import green from '@material-ui/core/colors/green'

const appTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '#root': {
          minHeight: '100vh',
          maxHeight: '100vh',
          display: 'flex',
          overflow: 'hidden',
        },
      },
    },
  },
  palette: {
    primary: green,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
