import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { IHandleQueryResult } from 'src/auth/auth.types';
import { unauthorized } from 'src/auth/constants';
import { UseQueryStateResult } from '@reduxjs/toolkit/dist/query/react/buildHooks';

class AuthenticationManager {
  errorMessage(error: FetchBaseQueryError | SerializedError) {
    if (
      'data' in error &&
      typeof error.data === 'object' &&
      error.data !== null &&
      'status' in error.data &&
      typeof (error.data as any).status === 'string'
    ) {
      this.setUnauthenticated('isAuthenticated');
      return (error.data as any).status || '';
    }

    return '';
  }

  isAuthenticated(result: UseQueryStateResult<any, any>) {
    if (result.error) {
      if (result.error.status === unauthorized) {
        this.setUnauthenticated('isAuthenticated');
      }
    } else if (result.isSuccess) {
      this.setIsAuthenticated();
    }
  }

  handleQueryResult(result: UseQueryStateResult<any, any>): IHandleQueryResult {
    if (result.error) {
      const errorMsg = this.errorMessage(result.error);
      const errorCode = AuthenticationManager.getErrorCode(result.error);

      return {
        errorCode,
        errorMsg,
        isSuccess: false,
      };
    }

    if (result.isSuccess) {
      return {
        errorCode: 200,
        errorMsg: '',
        isSuccess: true,
      };
    }

    return {
      errorCode: 200,
      errorMsg: '',
      isSuccess: false,
    };
  }

  private static getErrorCode(result: UseQueryStateResult<any, any>): number {
    return result?.error?.status;
  }

  private setIsAuthenticated() {
    localStorage.setItem('isAuthenticated', 'true');
  }
  private setUnauthenticated(key: string) {
    localStorage.removeItem(key);
  }
}

export const processingNetworkRequests = new AuthenticationManager();
