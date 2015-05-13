var React = require('react');
var Header = require('../components/Header.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var NotePage = require('../components/notes/NotePage.react.jsx');
var NotesSidebar = require('../components/notes/NotesSidebar.react.jsx');
var LoginPage = require('../components/session/LoginPage.react.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
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
  		<div className="container wrap">
		    <div className="container">
	        <div className="col-xs-4">
		        <div id="sidebar"><NotesSidebar /></div>
	        </div>
	        <div className="col-xs-8">
	        	<div className="well"><NotePage /></div>
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
	          		email={this.state.email} />
		    </div>
    		<div>
		    	{mainPage}
	    	</div>
    	</div>
    );
  }
});

module.exports = NotesApp;