import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension'; // Updated import for Redux DevTools
import { thunk } from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store