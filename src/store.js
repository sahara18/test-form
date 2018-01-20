import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {reducer as form} from 'utils/redux-form';

let enhancers = applyMiddleware(thunk);

if (process.env.NODE_ENV === 'development') {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (reduxDevTools) {
    enhancers = compose(enhancers, reduxDevTools());
  }
}

const reducers = combineReducers({
  form
});

export default createStore(
  reducers,
  enhancers
);
