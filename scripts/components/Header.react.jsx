var React = require('react');
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');

var Header = React.createClass({
  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string
  },
  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },
  render: function() {
    var userLinks = this.props.isLoggedIn ? (
      <div className="user-links">
        <a href='#' onClick={this.logout}>Logout</a>
      </div>
    ) : (
      <div className="user-links">
      
      </div>
    );
    return (
      <header>
        <div className="well">
          <a href="#"><strong>ReactNotes</strong></a>
          {userLinks}
        </div>
      </header>
    );
  }
});

module.exports = Header;