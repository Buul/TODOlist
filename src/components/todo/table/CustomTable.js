import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import CustomModal from '../../modal/CustomModal';
import EditTodo from '../EditTodo';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    openModal: false,
    titleModal: '',
    btnConfirmar: false,
    openEdit: false,
    dataEdit: {},
  };

  componentWillReceiveProps(nextProps) {
    const { data } = this.state;
    if (data !== nextProps.data) {
      this.setState({ data: nextProps.data });
    }
  }

  handleCloseModal = () => {
    this.setState({ openModal: false, openEdit: false });
  };

  handleRequestSort = (event, property) => {
    const orderByState = property;
    let orderState = 'desc';
    const { orderBy, order } = this.state;
    if (orderBy === property && order === 'desc') {
      orderState = 'asc';
    }

    this.setState({ order: orderState, orderBy: orderByState });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleEdit = dataEdit => {
    this.setState({ openEdit: true, dataEdit });
  };

  handleDeleteQuestion = idSelected => {
    const messageModal = [];
    messageModal.push('Deseja deletar este TODO ?');
    this.setState({
      openModal: true,
      titleModal: 'Atenção',
      messageModal,
      btnConfirmar: true,
      idSelectedDelete: idSelected,
    });
  };

  handleConfirmDelete = () => {
    const { idSelectedDelete } = this.state;
    const { remove } = this.props;
    remove(idSelectedDelete);
    this.setState({ openModal: false });
  };

  handleEditSave = data => {
    const { edit } = this.props;
    edit(data);
    this.setState({ openEdit: false });
  };

  handleBulkEditConcluido = params => {
    const { bulkEdit } = this.props;
    const { data } = this.state;
    bulkEdit({ ativo: params.ativo, listSelected: params.listSelected, data });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  render() {
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      openModal,
      titleModal,
      messageModal,
      btnConfirmar,
      openEdit,
      dataEdit,
    } = this.state;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          listSelected={selected}
          tableData={data}
          onSaveChangeConcluido={this.handleBulkEditConcluido}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={event => this.handleClick(event, n.id)}
                          checked={isSelected}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.description}
                      </TableCell>
                      <TableCell>
                        {n.ativo && (
                          <CheckCircleOutline style={{ color: '#7CFC00', fontSize: 30 }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Editar">
                          <IconButton aria-label="Editar" onClick={() => this.handleEdit(n)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton
                            aria-label="Deletar"
                            onClick={() => this.handleDeleteQuestion(n.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <CustomModal
          open={openModal}
          closeModal={this.handleCloseModal}
          confirmModal={this.handleConfirmDelete}
          title={titleModal}
          message={messageModal}
          btnConfirmar={btnConfirmar}
        />
        <EditTodo
          open={openEdit}
          closeModal={this.handleCloseModal}
          title="Editar Todo"
          data={dataEdit}
          onSave={this.handleEditSave}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  bulkEdit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      ativo: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
};

EnhancedTable.defaultProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      description: '',
      ativo: false,
      id: 0,
    })
  ),
};

export default withStyles(styles)(EnhancedTable);
