var React = require('react');

var Header = React.createClass({
  render: function() {
    var userLinks = this.props.isLoggedIn ? (
      <div className="user-links">
        <a href='#' onClick={this.logout}>Logout</a>
      </div>
    ) : (
      <div className="user-links">
        Login
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