import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from './todoSlice';

import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  todos: todoReducer,
},)

const persistConfig = {
  key: 'root',
  storage,
  // Blacklist - то что не нужно добавлять, например фетч запросы с API
  // Whitelist - хз
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore ({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store;