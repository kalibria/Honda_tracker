import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkQueryErrorLogger } from 'src/redux/rtkQueryErrorLogger';
import userReducer from 'src/redux/userDataSlice';
import { hondaApi } from 'src/services/hondaApi';
import authReducer from 'src/redux/authSlice';

export const store = configureStore({
  reducer: {
    [hondaApi.reducerPath]: hondaApi.reducer,
    auth: authReducer,
    userData: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hondaApi.middleware, rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
