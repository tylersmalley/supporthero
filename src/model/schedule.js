var DisplayDate = require('../DisplayDate');

var Schedule = {
  displayDate: function() {
    var date = new Date(this.date + 'T00:00:00');
    var display = new DisplayDate(date);

    return display.pretty();
  },

  isToday: function() {
    var date = new Date(this.date + 'T00:00:00');
    var today = new Date();

    return (
      date.getUTCDay() === today.getUTCDay() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCFullYear() === today.getUTCFullYear()
    );
  }
};

module.exports = Schedule;
