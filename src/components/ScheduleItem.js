/**
 * Dependencies
 */

var React = require('react');

var ScheduleItem = React.createClass({
  render: function() {
    var schedule = this.props.schedule;

    return (
      <div className='schedule-item row'>
        <div className='schedule-item-date col-md-4'>
          {schedule.displayDate()}
        </div>

        <div className='schedule-item-name col-md-8'>
          {schedule.user.name}
        </div>
      </div>
    );
  }
});

module.exports = ScheduleItem;
