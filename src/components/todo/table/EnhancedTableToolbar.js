import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.primary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTableToolbar extends Component {
  state = {
    checkedB: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.numSelected === 1) {
      nextProps.tableData.forEach(element => {
        if (element.id === nextProps.listSelected[0]) {
          this.setState({ checkedB: element.ativo });
        }
      });
    }
  }

  handleChangeCheck = event => {
    this.setState({ checkedB: event.target.checked });
  };

  handleSave = () => {
    const { onSaveChangeConcluido, listSelected } = this.props;
    const { checkedB } = this.state;
    onSaveChangeConcluido({ listSelected, ativo: checkedB });
  };

  render() {
    const { numSelected, classes } = this.props;
    const { checkedB } = this.state;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selecionado(s)
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              TODOlist
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 && (
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
          )}
        </div>
        {numSelected > 0 && (
          <Button
            variant="raised"
            component="span"
            className={classes.button}
            color="primary"
            onClick={() => this.handleSave()}
          >
            Salvar
          </Button>
        )}
      </Toolbar>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  numSelected: PropTypes.number.isRequired,
  listSelected: PropTypes.arrayOf(PropTypes.number),
  onSaveChangeConcluido: PropTypes.func,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      ativo: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
};

EnhancedTableToolbar.defaultProps = {
  onSaveChangeConcluido: () => {},
  listSelected: PropTypes.arrayOf([]),
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      description: '',
      ativo: false,
      id: 0,
    })
  ),
};
export default withStyles(toolbarStyles)(EnhancedTableToolbar);
