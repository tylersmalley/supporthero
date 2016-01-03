var Base = require('./Base');
var Dispatcher = require('../Dispatcher');
var assign = require('lodash/object/assign');
var api = require('../api');
var _ = {
  findIndex: require('lodash/array/findIndex'),
  filter: require('lodash/collection/filter')
};

var _schedules;

var SchedulesStore = assign({}, Base, {
  getAll: function(user_id) {
    return _schedules || [];
  },

  forUser: function(user_id) {
    return _.filter(this.getAll(), { user_id: user_id });
  }
});

SchedulesStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case 'SCHEDULES_LOAD':

      api.schedules.list().then(function(schedules) {
        _schedules = schedules;
        SchedulesStore.emitChange();
      });

      break;

    case 'SCHEDULES_SET':
      _schedules = action.schedules;
      SchedulesStore.emitChange();

      break;

    case 'SCHEDULE_DELETE':
      api.schedules.delete(action.id).then(function(schedule) {
        var index = _.findIndex(_schedules, { id: schedule.id });
        _schedules.splice(index, 1, schedule);

        SchedulesStore.emitChange();
      });

      break;

    case 'SCHEDULE_UPDATE':
      api.schedules.update(action.id, { date: action.date }).then(function(schedule) {
        // since we are swapping schedules, we refresh
        api.schedules.list().then(function(schedules) {
          _schedules = schedules;
          SchedulesStore.emitChange();
        });
      });

      break;
  }
});

module.exports = SchedulesStore;
