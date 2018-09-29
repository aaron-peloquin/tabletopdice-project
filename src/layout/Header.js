import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core/'

export default () =>
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="headline" color="textPrimary" align="center">Tabletop Dice</Typography>
    </Toolbar>
  </AppBar>