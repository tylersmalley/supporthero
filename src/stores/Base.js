var EventEmitter = require('events').EventEmitter
  , assign = require('lodash/object/assign');

module.exports = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(listener) {
    this.on('change', listener);
  },

  removeChangeListener: function(listener) {
    this.removeListener('change', listener);
  },
});
