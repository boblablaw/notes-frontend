var React = require('react');
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var Index = require('../components/notes/Index.react.jsx');

var Header = React.createClass({
  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    username: ReactPropTypes.string,
    email: ReactPropTypes.string
  },

  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },

  render: function() {
    var userLinks = this.props.isLoggedIn ? (
      <div className="user-links">
        <span className="user-name">
          Signed in as {this.props.username}
        </span>
        <a href='#' onClick={this.logout}>Logout</a>
      </div>
    ) : (
      <div className="user-links"></div>
    );
    return (
      <header>
        <div className="well">
        <a href="#"><strong>ReactNotes</strong>{Index}</a>
          {userLinks}
        </div>
      </header>
    );
  }
});

module.exports = Header;
