var React = require('react');
var Header = require('../components/Header.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var NoteItem = require('../components/notes/NoteItem.react.jsx');
var NotesSidebar = require('../components/notes/NotesSidebar.react.jsx');
var LoginPage = require('../components/session/LoginPage.react.jsx');
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

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
  var mainPage = this.state.isLoggedIn ? (
      <div className="container wrap">
        <div className="container">
          <div className="col-xs-4">
          <button className="new-note btn btn-default"><i className="fa fa-plus-circle"></i> New Note</button>
            <div id="sidebar"><NotesSidebar/></div>
          </div>
          <div className="col-xs-8">
            <div><RouteHandler/></div>
          </div>
        </div>
      </div>
    ) : (
	    <LoginPage />
    );


    return (
      <div className="container wrap">
        <div className="row">
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
