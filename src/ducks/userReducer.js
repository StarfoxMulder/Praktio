export const actions = {
  UPDATE: 'user/update',
  CLEAR: 'user/clear',
};

export const update = (payload) => {
  return {
    type: actions.UPDATE,
    payload,
  };
};

export const clear = () => {
  return {
    type: actions.CLEAR,
  };
};

export const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case actions.CLEAR:
      return initialState;
    default:
      return state;
  }
};
