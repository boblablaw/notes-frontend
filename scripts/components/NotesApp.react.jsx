var React = require('react');
var Header = require('../components/Header.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var NotePage = require('../components/notes/NotePage.react.jsx');
var NotesSidebar = require('../components/notes/NotesSidebar.react.jsx');

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
    return (
    	<div className="container wrap">
	    	<div className="row">
	        <Header 
	        		isLoggedIn={this.state.isLoggedIn}
          		email={this.state.email} />
		    </div>
		    <div className="container">
	        <div className="col-xs-4 sidebar">
		        <div><NotesSidebar /></div>
		        </div>
	        <div className="col-xs-8">
	        	<div className="well"></div>
        	</div>
			  </div>  
	    </div>
    );
  }
});

module.exports = NotesApp;