import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

class queryProcessing {
  errorStatus(error: FetchBaseQueryError | SerializedError) {
    if (
      'data' in error &&
      typeof error.data === 'object' &&
      error.data !== null &&
      'status' in error.data &&
      typeof error.data.status === 'string'
    ) {
      localStorage.removeItem('sessionID');
      return error.data.status || '';
    }

    return '';
  }
  isAuth() {
    localStorage.setItem('sessionID', 'true');
  }
}

export const processingNetworkRequests = new queryProcessing();
