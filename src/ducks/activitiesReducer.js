export const actions = {
  UPDATE: 'activities/update',
  CLEAR: 'activities/clear',
};

export const update = (payload) => {
  return {
    type: actions.UPDATE,
    payload,
  };
};

export const initialState = {
  current: undefined,
};

export const activitiesReducer = (state = initialState, action) => {
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
