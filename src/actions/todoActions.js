import axios from 'axios';

const URL = 'http://localhost:3000/todo/';

export const clean = () => ({
  type: 'CLEAR',
});

export const search = () => dispatch => {
  axios
    .get(URL)
    .then(resp => dispatch({ type: 'TODO_SEARCHED', payload: resp.data }))
    .catch(e =>
      dispatch({
        type: 'TODO_ERROR',
        payload: { error: e.message, errorCustomMessage: 'Falha ao buscar lista de TODO' },
      })
    );
};

export const add = data => dispatch => {
  axios
    .post(`${URL}`, data)
    .then(() => dispatch({ type: 'TODO_SUCCESS', payload: 'Todo incluído com sucesso' }))
    .then(() => dispatch(search()))
    .catch(e =>
      dispatch({
        type: 'TODO_ERROR',
        payload: {
          error: e.message,
          errorCustomMessage: 'Falha ao incluir TODO',
        },
      })
    );
};

export const edit = data => dispatch => {
  axios
    .put(`${URL}/${data.id}`, data)
    .then(() => dispatch({ type: 'TODO_SUCCESS', payload: 'Todo atualizado com sucesso' }))
    .then(() => dispatch(search()))
    .catch(e =>
      dispatch({
        type: 'TODO_ERROR',
        payload: {
          error: e.message,
          errorCustomMessage: 'Falha ao atualizar TODO',
        },
      })
    );
};

export const bulkEdit = params => dispatch => {
  params.listSelected.forEach((id, idx) => {
    let descEdit = '';
    params.data.forEach(element => {
      if (element.id === id) {
        descEdit = element.description;
      }
    });
    axios
      .put(`${URL}/${id}`, {
        id,
        description: descEdit,
        ativo: params.ativo,
      })
      .then(() => {
        if (idx === params.listSelected.length - 1)
          dispatch({ type: 'TODO_SUCCESS', payload: 'Todo(s) atualizado(s) com sucesso' });
      })
      .then(() => {
        if (idx === params.listSelected.length - 1) dispatch(search());
      })
      .catch(e =>
        dispatch({
          type: 'TODO_ERROR',
          payload: {
            error: e.message,
            errorCustomMessage: 'Falha ao atualizar TODO',
          },
        })
      );
  });
};

export const remove = id => dispatch => {
  axios
    .delete(`${URL}/${id}`)
    .then(() => dispatch({ type: 'TODO_SUCCESS', payload: 'Todo deletado com sucesso' }))
    .then(() => dispatch(search()))
    .catch(e =>
      dispatch({
        type: 'TODO_ERROR',
        payload: {
          error: e.message,
          errorCustomMessage: 'Falha ao remover TODO',
        },
      })
    );
};
