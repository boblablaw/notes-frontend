var React = require('react');
var Header = require('../components/Header.react.jsx');

var App = React.createClass({
  render: function() {
    return (
    	<div className="container wrap">
	    	<div className="row">
		      <div className="col-xs-12">
	        	<Header />
		      </div>
		    </div>
		    <div className="container">
		      <div className="row">
		        <div className="col-xs-4 well">
			        <nav id="sidebar">Sidebar</nav>
		        </div>
		        <div className="col-xs-8">
		        	<div className="well">Main</div>
	        	</div>
		      </div>
		    </div>
	    </div>
    );
  }
});

module.exports = App;