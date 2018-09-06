import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import CustomModal from '../modal/CustomModal';
import CustomTable from './table/CustomTable';
import AddTodo from './EditTodo';
import {
  search as searchAction,
  add as addAction,
  clean as cleanAction,
  remove as removeAction,
  edit as editAction,
  bulkEdit as bulkEditAction,
} from '../../actions/todoActions';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    width: '100%',
  },
});

class Todo extends Component {
  state = {
    tableData: [],
    openModal: false,
    titleModal: '',
    btnConfirmar: false,
    todoList: [],
    concluida: true,
    naoConcluida: true,
    openAdd: false,
  };

  componentDidMount() {
    this.getAllTodos();
  }

  componentWillReceiveProps(nextProps) {
    const { tableData } = this.state;
    const { clear } = this.props;
    if (nextProps.list !== tableData) {
      this.setState({ tableData: nextProps.list, todoList: nextProps.list });
    }
    if (nextProps.error !== '') {
      const messageModal = [];
      messageModal.push(nextProps.errorCustomMessage);
      messageModal.push(nextProps.error);
      this.setState({
        openModal: true,
        openAdd: false,
        titleModal: 'Error',
        messageModal,
        btnConfirmar: false,
      });
      clear();
    }
    if (nextProps.success !== '') {
      const messageModal = [];
      messageModal.push(nextProps.success);
      this.setState({
        openModal: true,
        openAdd: false,
        titleModal: 'Sucesso',
        messageModal,
        btnConfirmar: false,
      });
      clear();
    }
  }

  getAllTodos = () => {
    const { search } = this.props;
    search();
  };

  handleCloseModal = () => {
    this.setState({ openModal: false, openAdd: false });
  };

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.value });
  };

  handleAdd = () => {
    this.setState({ openAdd: true });
  };

  handleSave = data => {
    const { add } = this.props;
    add(data);
  };

  handleRemove = id => {
    const { remove } = this.props;
    remove(id);
  };

  handleEdit = data => {
    const { edit } = this.props;
    edit(data);
  };

  handleBulkEdit = data => {
    const { bulkEdit } = this.props;
    bulkEdit(data);
  };

  handleChangeChecked = name => event => {
    const { concluida, naoConcluida, todoList } = this.state;
    switch (name) {
      case 'concluida':
        if (event.target.checked && naoConcluida) this.setState({ tableData: todoList });
        if (!event.target.checked && !naoConcluida) {
          this.setState({ tableData: [] });
        }
        if (event.target.checked && !naoConcluida) {
          const dataFilter = [];
          todoList.forEach(element => {
            if (element.ativo) dataFilter.push(element);
          });
          this.setState({ tableData: dataFilter });
        }
        if (!event.target.checked && naoConcluida) {
          const dataFilter = [];
          todoList.forEach(element => {
            if (!element.ativo) dataFilter.push(element);
          });
          this.setState({ tableData: dataFilter });
        }
        break;
      case 'naoConcluida':
        if (event.target.checked && concluida) this.setState({ tableData: todoList });
        if (!event.target.checked && !concluida) {
          this.setState({ tableData: [] });
        }
        if (event.target.checked && !concluida) {
          const dataFilter = [];
          todoList.forEach(element => {
            if (!element.ativo) dataFilter.push(element);
          });
          this.setState({ tableData: dataFilter });
        }
        if (!event.target.checked && concluida) {
          const dataFilter = [];
          todoList.forEach(element => {
            if (element.ativo) dataFilter.push(element);
          });
          this.setState({ tableData: dataFilter });
        }
        break;
      default:
        break;
    }
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const {
      openModal,
      titleModal,
      messageModal,
      btnConfirmar,
      tableData,
      concluida,
      naoConcluida,
      openAdd,
    } = this.state;

    return (
      <Paper className={classes.root} elevation={4}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} md={10}>
            <Typography variant="headline" component="h3">
              TODO
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="raised"
              component="span"
              className={classes.button}
              color="primary"
              onClick={() => this.handleAdd()}
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={concluida} onChange={this.handleChangeChecked('concluida')} />
                  }
                  label="Concluída"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={naoConcluida}
                      onChange={this.handleChangeChecked('naoConcluida')}
                    />
                  }
                  label="Não concluída"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <CustomTable
          refresh={this.getAllTodos}
          data={tableData}
          remove={this.handleRemove}
          edit={this.handleEdit}
          bulkEdit={this.handleBulkEdit}
        />
        <CustomModal
          open={openModal}
          closeModal={this.handleCloseModal}
          confirmModal={this.handleConfirmDelete}
          title={titleModal}
          message={messageModal}
          btnConfirmar={btnConfirmar}
        />
        <AddTodo
          open={openAdd}
          closeModal={this.handleCloseModal}
          title="Novo Todo"
          data={{}}
          onSave={this.handleSave}
        />
      </Paper>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  search: PropTypes.func,
  add: PropTypes.func,
  edit: PropTypes.func,
  remove: PropTypes.func,
  bulkEdit: PropTypes.func,
  clear: PropTypes.func,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      ativo: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
  error: PropTypes.string,
  errorCustomMessage: PropTypes.string,
  success: PropTypes.string,
};

Todo.defaultProps = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      description: '',
      ativo: false,
      id: 0,
    })
  ),
  search: () => {},
  clear: () => {},
  add: () => {},
  edit: () => {},
  remove: () => {},
  bulkEdit: () => {},
  error: '',
  errorCustomMessage: '',
  success: '',
};

const mapStateToProps = state => ({
  list: state.todo.list,
  error: state.todo.error,
  errorCustomMessage: state.todo.errorCustomMessage,
  success: state.todo.success,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      search: searchAction,
      add: addAction,
      clear: cleanAction,
      remove: removeAction,
      edit: editAction,
      bulkEdit: bulkEditAction,
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todo)
);
