import { MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn(action.payload.data.status);
    }

    return next(action);
  };
