var Base = require('./Base');
var Dispatcher = require('../Dispatcher');
var api = require('../api');
var localStorage = require('../localStorage');

var _ = {
  assign: require('lodash/object/assign'),
  get: require('lodash/object/get')
};

var _session;
var _error;

var SessionStore = _.assign({}, Base, {

  /**
   * @param {String} path - path in session object. example: 'user.name'
   */

  get: function(path) {
    if (_session && path) {
      return _.get(_session, path);
    }

    return _session;
  },

  set: function(session) {
    _error = null;
    _session = session;

    // persist session to localstorage
    localStorage.set('session', session);

    this.emitChange();
  },

  logout: function() {
    _session = null;
    localStorage.delete('session');

    this.emitChange();
  },

  load: function() {
    var session;
    try {
      session = localStorage.get('session');

      if (new Date(session.expires_at) > new Date()) {
        _session = session;
      }

      this.emitChange();
    } catch(e) {}
  },

  getError: function() {
    return _error;
  },

  setError: function(error) {
    _error = error;
    _session = null;

    this.emitChange();
  },

  isLoggedIn: function() {
    return typeof this.get('access_token') == 'string';
  }
});

SessionStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case 'SESSION_LOGIN':
      var name = action.name;
      var password = action.password;

      api.session.login(name, password).then(function(session) {
        if (session.error) {
          return SessionStore.setError(session.error);
        }

        SessionStore.set(session);
      });

      break;

    case 'SESSION_LOGOUT':
      SessionStore.logout();

      break;

    case 'SESSION_LOAD':
      SessionStore.load();

      break;

  }
});

module.exports = SessionStore;
