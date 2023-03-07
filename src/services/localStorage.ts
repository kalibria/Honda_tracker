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

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export const myLocalStorage = new LocalStorage();
