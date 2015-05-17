var React = require('react');
var Header = require('../components/Header.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var NotesPage = require('../components/notes/NotesPage.react.jsx');
var NoteItem = require('../components/notes/NoteItem.react.jsx');
var NotesSidebar = require('../components/notes/NotesSidebar.react.jsx');
var LoginPage = require('../components/session/LoginPage.react.jsx');
var SignupPage = require('../components/session/SignupPage.react.jsx');
var RouteActionCreators = require('../actions/RouteActionCreators.react.jsx');
var RouteHandler = require('react-router').RouteHandler;

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail(),
    username: SessionStore.getUsername(),
  };
}

var NotesApp = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },
  
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    var mainPage = this.state.isLoggedIn ? (
      <NotesPage />
    ) : (
      <LoginPage />
    );

    return (
      <div className="container wrap">
        <div>
          <Header
            isLoggedIn={this.state.isLoggedIn}
            email={this.state.email}
            username={this.state.username} />
        </div>
        <div>
          {mainPage}
        </div>
      </div>
    );
  }
});

module.exports = NotesApp;
