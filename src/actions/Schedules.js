var Dispatcher = require('../Dispatcher');

module.exports = {
  set: function(schedules) {
    Dispatcher.dispatch({
      type: 'SCHEDULES_SET',
      schedules: schedules
    });
  },

  load: function(schedules) {
    Dispatcher.dispatch({
      type: 'SCHEDULES_LOAD'
    });
  },

  delete: function(id) {
    Dispatcher.dispatch({
      type: 'SCHEDULE_DELETE',
      id: id
    });
  },

  update: function(id, date) {
    Dispatcher.dispatch({
      type: 'SCHEDULE_UPDATE',
      id: id,
      date: date
    });
  }
};
