/**
 * Dependencies
 */

var React = require('react');
var SessionActions = require('../actions/Session')
var SessionStore = require('../stores/Session')

USERS = ['Sherry', 'Boris', 'Vicente', 'Matte', 'Jack',
  'Kevin', 'Zoe', 'Jay', 'Eadon', 'Franky','Luis', 'James'];

var Login = React.createClass({
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
    return (
      <form onSubmit={this._onSubmit}>
        {this._renderError()}

        <div className='form-group row'>
          <label htmlFor='inputEmail3' className='col-sm-2 form-control-label'>
            Name
          </label>
          <div className='col-sm-10'>
            <input
              className='form-control'
              ref='name'
              placeholder='Sherry' />

          </div>
        </div>
        <div className='form-group row'>
          <label htmlFor='inputPassword3' className='col-sm-2 form-control-label'>
            Password
          </label>
          <div className='col-sm-10'>
            <input
              type='password'
              className='form-control'
              ref='password'
              placeholder='sherry123' />

          </div>
        </div>
        <div className='form-group row'>
          <div className='col-sm-offset-2 col-sm-10'>
            <button type='submit' className='btn btn-secondary'>
              Sign in
            </button>
          </div>
        </div>

        {this._renderHelp()}
      </form>
    );
  },

  _renderHelp: function() {
    function item(name) {
      return (
        <li key={name}>
          {name} : {name.toLowerCase()}123
        </li>
      );
    }
    return (
      <div className='row'>
        <div className='col-sm-12'>
          Logins:
          <ul>
            {USERS.map(item)}
          </ul>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(this._getStateFromStore())
  },

  _getStateFromStore: function() {
    return { session: SessionStore.get(), error: SessionStore.getError() };
  },

  _renderError: function() {
    if (!this.state.error) {
      return;
    }

    return (
      <div className='alert alert-danger' role='alert'>
        {this.state.error}
      </div>
    );
  },

  _onSubmit: function(e) {
    e.preventDefault();

    SessionActions.login(this.refs.name.value, this.refs.password.value);
  }
});

module.exports = Login;
