var months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
  'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

var DisplayDate = function(date) {
  this.date = date;
}

DisplayDate.prototype.pretty = function() {
  var day = this.date.getUTCDate();
  var month = months[this.date.getUTCMonth()];
  var year = this.date.getUTCFullYear();

  return month + ' ' + day + ', ' + year;
};

module.exports = DisplayDate;
