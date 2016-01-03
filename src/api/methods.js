var localStorage = require('../localStorage');

module.exports = {
  get: function(path) {
    return fetch(__CONFIG__.apiBase + path, {
      method: 'get',
      headers: this.defaultHeaders()
    }).then(function(response) {
      return response.json();
    });
  },

  post: function(path, data) {
    return fetch(__CONFIG__.apiBase + path, {
      method: 'post',
      headers: this.defaultHeaders(),
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    });
  },

  put: function(path, data) {
    return fetch(__CONFIG__.apiBase + path, {
      method: 'put',
      headers: this.defaultHeaders(),
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    });
  },

  delete: function(path) {
    return fetch(__CONFIG__.apiBase + path, {
      method: 'delete',
      headers: this.defaultHeaders()
    }).then(function(response) {
      return response.json();
    });
  },

  patch: function(path, data) {
    return fetch(__CONFIG__.apiBase + path, {
      method: 'patch',
      headers: this.defaultHeaders(),
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    });
  },

  defaultHeaders: function() {
    var session = localStorage.get('session');
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (session && session.access_token) {
      headers['Authorization'] = 'Bearer ' + session.access_token
    }

    return headers;
  }
};
