var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var NotesApp = require('./components/NotesApp.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var NotesSidebar = require('./components/notes/NotesSidebar.react.jsx');
var NoteItem = require('./components/notes/NoteItem.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');

module.exports = (
  <Route name="app" path="/" handler={NotesApp}>
    <DefaultRoute />
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="notes" path="/notes" handler={NotesSidebar}/>
    <Route name="note" path="/notes/:noteId" handler={NoteItem} />
  </Route>
);
