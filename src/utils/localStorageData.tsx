import { isErrorInFetchBaseQuery } from 'src/utils/isErrorInFetchBaseQuery';

interface IResultQuery {
  isSuccess?: string;
  error?: { data: {}; status: number };
}

class localStorageData {
  isAuth(resultOfQuery: IResultQuery) {
    if (resultOfQuery.isSuccess) {
      localStorage.setItem('sessionId', 'true');
      return true;
    } else if (resultOfQuery.error) {
      localStorage.removeItem('sessionId');
      return isErrorInFetchBaseQuery(resultOfQuery.error);
    }
  }
}

export const dataFromLS = new localStorageData();
