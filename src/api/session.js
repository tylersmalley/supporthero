/**
 * Dependencies
 */

var methods = require('./methods');

module.exports = {
  login: function(name, password) {
    return methods.post('session', { name: name, password: password });
  }
};
