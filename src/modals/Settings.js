import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grow,
  Modal,
  Typography
} from '@material-ui/core/';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    maxWidth: '75%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SettingsModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color="secondary" onClick={this.handleOpen} variant="contained">Settings</Button>
        <Modal
          aria-labelledby="settings-modal-title"
          aria-describedby="settings-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography color="textSecondary" variant="title" id="modal-title">Settings</Typography>
              <Typography color="textSecondary" variant="subheading" id="settings-modal-description">
                Configure what user interface elements are shown.
              </Typography>
            </div>
        </Modal>
      </div>
    );
  }
}

SettingsModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SettingsModalWrapped = withStyles(styles)(SettingsModal);

export default SettingsModalWrapped;