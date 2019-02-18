import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '@/redux/app.reducer';

export default createStore(appReducer, applyMiddleware(thunk));