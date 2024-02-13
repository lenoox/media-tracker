const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};
export const localStorageService = {
  setLocalStorage,
  getLocalStorage,
};
