import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Grid
} from '@material-ui/core/'
import {
  Settings,
  Sets
} from './../modals/'

function Header(PropTypes) {
  return <AppBar position="static" color="primary">
      <Toolbar>
      <Grid container
        spacing={24}
        justify="center"
      >
        <Grid item sm>
        <Typography variant="headline" color="textPrimary" align="left">Tabletop Dice</Typography>
        </Grid>
        <Grid item xs="3" align="right">
          <Settings />
        </Grid>
        <Grid item xs="3" align="left">
          <Sets />
        </Grid>
      </Grid>
      </Toolbar>
    </AppBar>
}

export default Header
