import { Dispatch, SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IHandleQueryResult } from 'src/auth/auth.types';
import { unauthorized } from 'src/auth/constants';
import { UseQueryStateResult } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { isAuth, logOut } from 'src/redux/authSlice';
import { myRtkQueryResultProcessor } from 'src/redux/rtkQueryResultProcessor';
import { myLocalStorage } from 'src/services/localStorage';

class AuthenticationManager {
  // errorMessage(error: FetchBaseQueryError | SerializedError) {
  //   if (
  //     'data' in error &&
  //     typeof error.data === 'object' &&
  //     error.data !== null &&
  //     'status' in error.data &&
  //     typeof (error.data as any).status === 'string'
  //   ) {
  //     this.setUnauthenticated('isAuthenticated');
  //     return (error.data as any).status || '';
  //   }
  //
  //   return '';
  // }

  // authenticate(
  //   result: UseQueryStateResult<any, any>,
  //   dispatch: Dispatch,
  // ): void {
  //   if (result.error) {
  //     myRtkQueryResultProcessor.handleErrorCode(result);
  //
  //     if (result.error.status === unauthorized) {
  //       this.setUnauthenticated(dispatch);
  //     }
  //   } else if (result.isSuccess) {
  //     this.setAuthenticated(dispatch);
  //   }
  // }

  setUnauthenticated(dispatch: Dispatch) {
    myLocalStorage.setItem('isAuthenticated', 'false');
    dispatch(logOut());
  }

  setAuthenticated(dispatch: Dispatch) {
    myLocalStorage.setItem('isAuthenticated', 'true');
    dispatch(isAuth());
  }

  // handleQueryResult(result: UseQueryStateResult<any, any>): IHandleQueryResult {
  //   if (result.isError) {
  //     const errorMsg = this.errorMessage(result.error);
  //     const errorCode = AuthenticationManager.getErrorCode(result.error);
  //
  //     return {
  //       errorCode,
  //       errorMsg,
  //       isSuccess: false,
  //     };
  //   }
  //
  //   if (result.isSuccess) {
  //     return {
  //       errorCode: 200,
  //       errorMsg: '',
  //       isSuccess: true,
  //     };
  //   }
  //
  //   return {
  //     errorCode: 200,
  //     errorMsg: '',
  //     isSuccess: false,
  //   };
  // }

  // public globalLogout(dispatch: Dispatch) {
  //   dispatch(logOut());
  //   myLocalStorage.logOut();
  // }

  // private static getErrorCode(result: UseQueryStateResult<any, any>): number {
  //   return result?.error?.status;
  // }

  // private setIsAuthenticated() {
  //   localStorage.setItem('isAuthenticated', 'true');
  // }
  // private setUnauthenticated(key: string) {
  //   localStorage.removeItem(key);
  // }
}

export const authenticationManager = new AuthenticationManager();
