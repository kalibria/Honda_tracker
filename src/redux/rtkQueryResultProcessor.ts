import { Dispatch, SerializedError } from '@reduxjs/toolkit';
import { UseQueryStateResult } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { badRequest, unauthorized } from 'src/auth/constants';
import { IHandleQueryResult } from 'src/ui-kit/components.types';

class RtkQueryResultProcessor {
  getErrorMessage(error: FetchBaseQueryError | SerializedError) {
    if (
      'data' in error &&
      typeof error.data === 'object' &&
      error.data !== null &&
      'status' in error.data &&
      typeof (error.data as any).status === 'string'
    ) {
      return (error.data as any).status || '';
    }

    return '';
  }

  getErrorCode(result: UseQueryStateResult<any, any>): number {
    return result?.error?.status;
  }

  parseQueryResult(result: UseQueryStateResult<any, any>): IHandleQueryResult {
    if (result.isError) {
      const errorMsg = this.getErrorMessage(result.error);
      const errorCode = this.getErrorCode(result.error);

      return {
        errorCode,
        errorMsg,
        isSuccess: false,
        isError: true,
      };
    }

    if (result.isSuccess) {
      return {
        errorCode: 200,
        errorMsg: '',
        isSuccess: true,
        isError: false,
      };
    }

    return {
      errorCode: 200,
      errorMsg: '',
      isSuccess: false,
      isError: false,
    };
  }

  handleErrorCode(result: UseQueryStateResult<any, any>, dispatch: Dispatch) {
    const errorCode = this.getErrorCode(result);

    if (errorCode === unauthorized) {
      console.warn(this.getErrorMessage(result));
    } else if (errorCode === badRequest) {
      console.warn(this.getErrorMessage(result));
    }
    return errorCode;
  }
}

export const myRtkQueryResultProcessor = new RtkQueryResultProcessor();
