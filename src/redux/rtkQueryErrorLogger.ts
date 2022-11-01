import { MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';
import { processingNetworkRequests } from 'src/auth/authenticationManager';
import { badRequest, unauthorized } from 'src/auth/constants';

export const rtkQueryErrorLogger: Middleware =
  ({ dispatch, getState }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const { errorCode, errorMsg } =
        processingNetworkRequests.handleQueryResult(action.payload);

      if (errorCode === unauthorized) {
        processingNetworkRequests.globalLogout(dispatch);
      }

      if (errorCode === badRequest) {
      }
    }

    return next(action);
  };
