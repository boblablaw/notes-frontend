var React = require('react');

var Header = React.createClass({
  render: function() {
    var rightNav = 
    (
      <div className="user-links">
        Login
      </div>
    );

    return (
      <header>
        <div className="well">
          <a href="#"><strong>ReactNotes</strong></a>
          {rightNav}
        </div>
      </header>
    );
  }
});

module.exports = Header;