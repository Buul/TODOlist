import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  button: {
    marginLeft: 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: props.data.description,
      error: false,
      checkedB: props.data.ativo,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { desc, checkedB } = this.state;
    if (nextProps.data.description !== desc || nextProps.data.ativo !== checkedB) {
      this.setState({ desc: nextProps.data.description, checkedB: nextProps.data.ativo });
    }
  }

  handleChange = event => {
    this.setState({ desc: event.target.value });
  };

  handleChangeCheck = event => {
    this.setState({ checkedB: event.target.checked });
  };

  verifyField() {
    const { desc, checkedB } = this.state;
    if (desc === '' || desc === null || desc === undefined) {
      this.setState({ error: true });
    } else {
      const { onSave, data } = this.props;
      onSave({ description: desc, ativo: checkedB, id: data.id || null });
    }
  }

  render() {
    const { open, closeModal, title, classes } = this.props;
    const { desc, error, checkedB } = this.state;
    return (
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent style={{ minWidth: 500 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                id="desc"
                label="Descrição"
                className={classes.textField}
                value={desc || ''}
                onChange={this.handleChange}
                margin="dense"
                fullWidth
                error={error}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={checkedB}
                    onChange={this.handleChangeCheck}
                    lue="checkedB"
                    color="primary"
                  />
                }
                label="Concluída"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.verifyField()}
            variant="raised"
            className={classes.button}
            color="primary"
            component="span"
          >
            Salvar
          </Button>
          <Button onClick={closeModal} variant="raised" className={classes.button} component="span">
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditTodo.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  title: PropTypes.string,
  classes: PropTypes.shape({
    button: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    description: PropTypes.string,
    ativo: PropTypes.bool,
  }),
};

EditTodo.defaultProps = {
  open: false,
  title: '',
  onSave: () => {},
  data: PropTypes.shape({
    description: '',
    ativo: false,
  }),
};

export default withStyles(styles)(EditTodo);
