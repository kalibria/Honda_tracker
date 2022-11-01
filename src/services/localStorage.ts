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
}

export const myLocalStorage = new LocalStorage();
