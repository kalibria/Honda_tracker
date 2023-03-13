import { MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';

import { badRequest, unauthorized } from 'src/auth/constants';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';

export const rtkQueryErrorLogger: Middleware =
  ({ dispatch, getState }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const { errorCode, errorMsg } =
        myRtkQueryResultProcessor.parseQueryResult(action.payload);

      if (errorCode === unauthorized) {
        console.warn(errorMsg);
        return;
      } else if (errorCode === badRequest) {
        console.warn(errorMsg);
        return;
      }
    }
    return next(action);
  };
