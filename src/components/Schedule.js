/**
 * Dependencies
 */

var React = require('react');
var _ = { filter: require('lodash/collection/filter') };

var SessionStore = require('../stores/Session');

/**
 * Components
 */

var ScheduleItem = require('./ScheduleItem');
var UserScheduleItem = require('./UserScheduleItem');

var Schedule = React.createClass({
  propTypes: {
    forCurrentUser: React.PropTypes.bool
  },

  getInitialState: function() {
    return this._getStateFromStore();
  },

  componentWillMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var self = this;
    var schedules = self.props.schedules;

    if (this.props.forCurrentUser) {
      schedules = _.filter(schedules, { user_id: self.state.user_id });
    }

    function getItems() {
      return schedules.map(function(schedule) {
        if (self.state.user_id == schedule.user_id) {
          return <UserScheduleItem key={schedule.id} schedule={schedule} />;
        } else {
          return <ScheduleItem key={schedule.id} schedule={schedule} />;
        }
      });
    }

    return (
      <div className='schedule'>
        {getItems()}
      </div>
    );
  },

  _getStateFromStore: function() {
    return {
      user_id: SessionStore.get('user.id')
    };
  },

  _onChange: function() {
    this.setState(this._getStateFromStore())
  }
});

module.exports = Schedule;
