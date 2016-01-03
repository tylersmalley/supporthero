var Dispatcher = require('../Dispatcher');

module.exports = {
  login: function(name, password) {
    Dispatcher.dispatch({
      type: 'SESSION_LOGIN',
      name: name,
      password: password
    });
  },

  logout: function() {
    Dispatcher.dispatch({
      type: 'SESSION_LOGOUT'
    });
  },

  load: function() {
    Dispatcher.dispatch({
      type: 'SESSION_LOAD'
    });
  }
};
