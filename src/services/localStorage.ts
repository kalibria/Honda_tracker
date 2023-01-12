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
    // this.removeItem('isAuthenticated');
    localStorage.clear();
    sessionStorage.clear();
  }

  isRefreshToken() {
    const isRefreshToken = this.getItem('RefreshToken');

    return !!isRefreshToken;
  }
}

export const myLocalStorage = new LocalStorage();
