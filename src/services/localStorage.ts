class LocalStorage {
  getItem(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
      return value;
    } else return '';
  }
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  logOut() {
    localStorage.clear();
  }

  isAuth() {
    const isAuth = this.getItem('isAuthenticated');
    if (isAuth === 'true') {
      return true;
    } else return false;
  }

  isRefreshToken() {
    const isRefreshToken = this.getItem('RefreshToken');

    return !!isRefreshToken;
  }
  // getRefreshAccessTokens() {
  //   const isRefreshToken = this.getItem('RefreshToken');
  //   const isAccessToken = sessionStorage.getItem('AccessToken');
  //
  //   if (isRefreshToken && isAccessToken) {
  //     return true;
  //   } else return false;
  // }
}

export const myLocalStorage = new LocalStorage();
