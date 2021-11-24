export const setDataToLocalStorage = <P>(key: string, data: P) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key: string) => localStorage.getItem(key);
