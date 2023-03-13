import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkQueryErrorLogger } from 'src/redux/rtkQueryErrorLogger';
import { hondaApi } from 'src/services/hondaApi';

export const store = configureStore({
  reducer: {
    [hondaApi.reducerPath]: hondaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hondaApi.middleware, rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
