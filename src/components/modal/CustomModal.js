import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  button: {
    marginLeft: 10,
  },
};

const CustomModal = props => {
  const { open, closeModal, title, message, btnConfirmar, classes, confirmModal } = props;
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        {_.map(message, (item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </DialogContent>
      <DialogActions>
        {btnConfirmar && (
          <Button
            onClick={confirmModal}
            variant="raised"
            className={classes.button}
            color="primary"
            component="span"
          >
            Confirmar
          </Button>
        )}
        <Button onClick={closeModal} variant="raised" className={classes.button} component="span">
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  confirmModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.arrayOf(PropTypes.string),
  btnConfirmar: PropTypes.bool,
  classes: PropTypes.shape({
    button: PropTypes.string,
  }).isRequired,
};

CustomModal.defaultProps = {
  open: false,
  btnConfirmar: false,
  title: '',
  message: [],
  confirmModal: () => {},
};

export default withStyles(styles)(CustomModal);
