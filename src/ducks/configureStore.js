import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { quizReducer } from './quizReducer';
import { activitiesReducer } from './activitiesReducer';
import { userReducer } from './userReducer';

const initialState = {};

const rootReducer = combineReducers({
  quiz: quizReducer,
  activities: activitiesReducer,
  user: userReducer,
});

export default function configureStore() {
  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));
}
