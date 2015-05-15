var React = require('react');
var NotesApp = require('./components/NotesApp.react.jsx');
var Router = require('react-router');
var Routes = require('./routes.jsx');

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
