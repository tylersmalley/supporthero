'strict mode'

/**
 * Dependencies
 */

var React = require('react');
var ReactDOM = require('react-dom');

var SessionStore = require('./stores/Session');
var SessionActions = require('./actions/Session');

var SchedulesStore = require('./stores/Schedules');
var SchedulesActions = require('./actions/Schedules');

var DisplayDate = require('./DisplayDate');

/**
 * Styles
 */

require('./scss/main.scss');

/**
 * Components
 */

var Schedule = require('./components/Schedule');
var Login = require('./components/Login');

/**
 * Primary application component
 */

var SupportHero = React.createClass({
  getInitialState: function() {
    return this._getStateFromStore();
  },

  componentWillMount: function() {
    SchedulesStore.addChangeListener(this._onChange);
    SchedulesActions.load();

    SessionStore.addChangeListener(this._onChange);
    SessionActions.load();
  },

  componentWillUnmount: function() {
    SchedulesStore.removeChangeListener(this._onChange);

    SessionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className='container'>
        <nav className='navbar navbar-full navbar-light bg-faded'>
          <a className='navbar-brand' href='#'>Support Hero</a>
          <ul className='nav navbar-nav pull-xs-right'>
            <li className='nav-item'>
              {this._renderLogout()}
            </li>
          </ul>
        </nav>

        {this._renderHeading()}

        <div className='row'>
          <div className='col-lg-6'>
            <div className='card'>
              <div className='card-header'>
                Full Schedule
              </div>
              <div className='card-block'>
                <Schedule schedules={this.state.schedules} />
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            {this._renderUserScheduleOrLogin()}
          </div>
        </div>
      </div>
    );
  },

  _getStateFromStore: function() {
    return {
      user: SessionStore.get('user') || {},
      schedules: SchedulesStore.getAll()
    };
  },

  _logout: function() {
    SessionActions.logout();
  },

  _renderLogout: function() {
    if (SessionStore.isLoggedIn()) {
      return (
        <a className='nav-link' onClick={this._logout}>
          Logout ({this.state.user.name})
        </a>
      );
    }
  },

  _renderUserScheduleOrLogin: function() {
    if (SessionStore.isLoggedIn()) {
      return (
        <div className='card'>
          <div className='card-header'>
            My Schedule
          </div>
          <div className='card-block'>
            <Schedule schedules={this.state.schedules} forCurrentUser={true} />
          </div>
        </div>
      );
    } else {
      return <Login />
    }
  },

  _onChange: function() {
    this.setState(this._getStateFromStore())
  },

  _renderHeading: function() {
    var heroText;
    var schedules = this.state.schedules;

    if (schedules && schedules[0] && schedules[0].isToday()) {
      heroText = schedules[0].user.name + ' is Support Hero Today';
    }

    return (
      <div className='jumbotron text-xs-center'>
        <h1 className='display-3'>
          {new DisplayDate(new Date).pretty()}
          <p className='lead'>{heroText}</p>
        </h1>
      </div>
    );
  }
});

ReactDOM.render(<SupportHero />, document.getElementById('app'));
