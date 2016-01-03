/**
 * Dependencies
 */

var assign = require('lodash/object/assign');
var schedule = require('../model/schedule');
var methods = require('./methods');

module.exports = {
  list: function() {
    return methods.get('schedules').then(function(items) {
      var schedules = [];

      items.forEach(function(item) {
        schedules.push(Object.create(assign({}, schedule, item)));
      });

      return schedules;
    });
  },

  delete: function(id) {
    return methods.delete('schedules/' + id).then(function(item) {
      return Object.create(assign({}, schedule, item));
    });
  },

  update: function(id, data) {
    var data = { schedule: data };

    return methods.put('schedules/' + id, data).then(function(item) {
      return Object.create(assign({}, schedule, item));
    });
  }
};
