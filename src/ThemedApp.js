import React from 'react';
import App from './App';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Theme from './layout/Theme'


function ThemedApp() {
  return <MuiThemeProvider theme={Theme}>
      <App />
    </MuiThemeProvider>
}

export default ThemedApp;
