var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Welcome = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    this.context.router.transitionTo('/welcome');
  },

  render: function() {
    return (
      <div>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Welcome;
