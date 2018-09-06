const INITIAL_STATE = { list: [], error: '', success: '', errorCustomMessage: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TODO_SEARCHED':
      return { ...state, list: action.payload, error: '' };
    case 'TODO_ERROR':
      return {
        ...state,
        error: action.payload.error,
        errorCustomMessage: action.payload.errorCustomMessage,
      };
    case 'TODO_SUCCESS':
      return { ...state, success: action.payload };
    case 'CLEAR':
      return { ...state, error: '', success: '', errorCustomMessage: '' };
    default:
      return state;
  }
};
