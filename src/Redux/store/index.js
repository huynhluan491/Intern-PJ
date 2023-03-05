import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import LinkReducer from '../reducers/LinkReducer';
import FilterReducer from '../reducers/FilterReducer';
import SearchReducer from '../reducers/SearchReducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['FilterReducer'],
};

const root = combineReducers({
    LinkReducer,
    FilterReducer,
    SearchReducer,
});

const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;
