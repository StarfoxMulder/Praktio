export const actions = {
  UPDATE: 'quiz/update',
  CLEAR: 'quiz/clear',
  SET_SELECTED: 'quiz/setSelected',
  SET_ANSWER: 'quiz/setAnswer',
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

export const setSelected = (selected) => {
  return {
    type: actions.SET_SELECTED,
    payload: {
      selected,
    },
  };
};

export const setAnswer = (selectedAnswer) => {
  return {
    type: actions.SET_ANSWER,
    payload: {
      selectedAnswer,
    },
  };
};

export const initialState = {
  selected: undefined,
  tries: 0,
  outOfTries: false,
  showTryAgain: false,
  selectedAnswer: undefined,
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case actions.SET_SELECTED: {
      const payload = action.payload;
      return {
        ...state,
        selected: payload.selected,
      };
    }
    case actions.SET_ANSWER:
      const payload = action.payload;
      return {
        ...state,
        selectedAnswer: payload.selectedAnswer,
      };
    case actions.CLEAR:
      return initialState;
    default:
      return state;
  }
};
