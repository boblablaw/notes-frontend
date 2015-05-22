var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SessionStore = require('../stores/SessionStore.react.jsx');

var Header = require('../components/Header.react.jsx');
var Welcome = require('../components/Welcome.react.jsx');
var NotesPage = require('../components/notes/NotesPage.react.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail(),
    username: SessionStore.getUsername(),
  };
}

var Main = React.createClass({
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
      <Welcome />
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

module.exports = Main;
