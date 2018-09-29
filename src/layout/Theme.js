import { createMuiTheme } from "@material-ui/core";

/** https://material.io/tools/color/#!/?view.left=1&view.right=0&primary.color=2E7D32&secondary.color=795548 */
export default createMuiTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      light: '#60ad5e',
      dark: '#005005'
    },
    secondary: {
      main: '#795548',
      light: '#a98274',
      dark: '#4b2c20'
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff'
    }
  },
})