import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkQueryErrorLogger } from 'src/redux/rtkQueryErrorLogger';
import { hondaApi } from 'src/services/hondaApi';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    [hondaApi.reducerPath]: hondaApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(hondaApi.middleware)
      .concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
