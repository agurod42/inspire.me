import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import inspirerReducer from '@/redux/inspirer/inspirer.reducer';
import torreReducer from '@/redux/torre/torre.reducer';

export default combineReducers({
  form: formReducer,

  inspirerReducer,
  torreReducer,
});
