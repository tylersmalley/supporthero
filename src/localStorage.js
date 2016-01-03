module.exports = {
  hasLocalStorage: (typeof Storage !== 'undefined'),

  /**
    * @param {string} key
    * @param {string} value
    */

  set: function(key, value) {
    key = 'sh_' + key;
    value = JSON.stringify(value);

    if (this.hasLocalStorage) {
      window.localStorage.setItem(key, value);
    } else {
      console.warn('localStorage is not available');
    }
  },

  /**
    * @param {string} key
    * @returns {string}
    */

  delete: function(key) {
    var value;

    key = 'sh_' + key;

    if (this.hasLocalStorage) {
      value = JSON.parse(window.localStorage.getItem(key));
      window.localStorage.removeItem(key);

      return value;
    } else {
      console.warn('localStorage is not available');
    }
  },

  /**
    * @param {string} key
    * @returns {string}
    */

  get: function(key) {
    key = 'sh_' + key;

    if (this.hasLocalStorage) {
      return JSON.parse(window.localStorage.getItem(key));
    } else {
      console.warn('localStorage is not available');
    }
  }
};
