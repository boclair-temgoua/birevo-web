// ** Redux Imports
import { combineReducers } from 'redux';
import organizations from './organizationReducer';
import users from './userReducer';
import subscribes from './subscribeReducer';
import currencies from './currencyReducer';

const rootReducer = combineReducers({
    organizations,
    users,
    currencies,
    subscribes,
});

export default rootReducer;
