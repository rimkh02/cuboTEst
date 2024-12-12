import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import authReducer from './slices/auth';
import employeeReducer from './slices/employee';
import categoriesReducer from './slices/categories';
import statistiquesReducer from './slices/statsiqtique';
import rechargementReducer from './slices/rechargement';
import accountsReducer from './slices/accounts';
import invoiceReducer from './slices/invoice';
import transationsReducer from './slices/transations';
import settingsReducer from './slices/settings';
import dataReducer from './slices/dataSlice';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated', 'isInitialized', 'user', 'company', 'temporal'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  categories: categoriesReducer,
  employee: employeeReducer,
  statistiques: statistiquesReducer,
  rechargement: rechargementReducer,
  accounts: accountsReducer,
  invoice: invoiceReducer,
  transation: transationsReducer,
  settings: settingsReducer,
  data: dataReducer,
});

/*export const rootReducer = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: AnyAction
) => {
  if (action.type === 'reset') {
    return combinedReducers(action.payload, action);
  }

  return combinedReducers(state, action);
};

//export { rootPersistConfig, rootReducer };
export { rootPersistConfig };*/
export { rootPersistConfig, rootReducer };
