export const filterRequestArray = (array, key, filterKey) => {
  if (Array.isArray(array) && array.length > 0) {
    return array.filter(
      (data) => data[key] === filterKey
    );
  } else {
    return [];
  }
};
