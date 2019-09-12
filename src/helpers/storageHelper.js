/**
 * @name setToStorage
 * @param {Object} data object containing values to set to local storage
 * @returns {Void} Null
 */
const setToStorage = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

/**
 * @name getFromStorage
 * @param {String} key key of value to get from local storage
 * @returns {Object} Object with value gotten from storage
 */
const getFromStorage = (key) => localStorage.getItem(key);

/**
 * @name clearStorage
 * @param {String} key of value to remove from storage else it clears the entire storage
 * @returns {Void} Nuoll
 */
const clearFromStorage = (key) => (key ? localStorage.removeItem(key) : localStorage.clear());

export { setToStorage, getFromStorage, clearFromStorage };
