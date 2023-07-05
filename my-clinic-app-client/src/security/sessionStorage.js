import store from 'store2';

export const setData = (key, value) => {
  store.set(key, value);
};

export const getData = (key) => {
  return store.get(key);
};

export const clearData = (key) => {
  store.remove(key);
};
