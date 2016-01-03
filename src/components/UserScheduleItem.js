/**
 * Dependencies
 */

var React = require('react');
var SchedulesActions = require('../actions/Schedules');
var SchedulesStore = require('../stores/Schedules');
var SessionStore = require('../stores/Session');

var ScheduleItem = React.createClass({
  getInitialState: function() {
    return { action: 'list' };
  },

  render: function() {
    var schedule = this.props.schedule;

    return (
      <div className='schedule-item row'>
        <div className='schedule-item-date col-md-4'>
          {schedule.displayDate()}
        </div>

        <div className='schedule-item-name schedule-item-mine col-md-8'>
          {this._renderActions()}
        </div>
      </div>
    );
  },

  _renderActions: function() {
    switch(this.state.action) {
      case 'change-date':
        var user_id = SessionStore.get('user.id');

        function dateOptions() {
          return SchedulesStore.getAll().map(function(schedule) {
            if (user_id == schedule.user_id) {
              return;
            }

            return (
              <option key={schedule.date} value={schedule.date}>
                {schedule.displayDate()} - {schedule.user.name}
              </option>
            );
          });

        }
        return (
          <div>
            <div className='row'>
              <select className='c-select' ref='date'>
                {dateOptions()}
              </select>
            </div>

            <div className='row'>
              <button
                type='button'
                onClick={this._swapDate}
                className='btn btn-link btn-sm'>

                save
              </button>

              <button
                type='button'
                onClick={this._cancelAction}
                className='btn btn-link btn-sm'>

                cancel
              </button>
            </div>
          </div>
        );

        break;

      default:
        return (
          <div className='btn-group btn-group-sm' role='group'>
            <button
              type='button'
              onClick={this._handleSwap}
              className='btn btn-secondary'>

              Swap
            </button>

            <button
              type='button'
              onClick={this._handleUnworkable}
              className='btn btn-secondary'>

              Unworkable
            </button>
          </div>
        );
    }
  },

  _cancelAction: function() {
    this.setState({ action: 'list' });
  },

  _handleUnworkable: function() {
    SchedulesActions.delete(this.props.schedule.id);
  },

  _handleSwap: function() {
    this.setState({ action: 'change-date' });
  },

  _swapDate: function() {
    SchedulesActions.update(this.props.schedule.id, this.refs.date.value);
    SchedulesActions.load();
  }
});

module.exports = ScheduleItem;
