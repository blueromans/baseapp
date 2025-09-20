// Third Party Libraries
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Local Components and Hooks
import { api } from './api';
import { authReducer } from './auth';
import { reduxStorage } from './storage';
import { rtkQueryErrorLogger } from './errorHandler';

const persistConfig = {
  storage: reduxStorage,
  key: 'root',
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authentication: authReducer,
});

const middlewares = [api.middleware, rtkQueryErrorLogger];

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middlewares),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
