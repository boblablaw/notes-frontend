var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var NotesApp = require('./components/NotesApp.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var NotesSidebar = require('./components/notes/NotesSidebar.react.jsx');
var NoteItem = require('./components/notes/NoteItem.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');
var NotesPage = require('./components/notes/NotesPage.react.jsx');
var NoteNew = require('./components/notes/NoteNew.react.jsx');
var NotFound = require('./components/common/NotFound.react.jsx');
var Index = require('./components/notes/Index.react.jsx');

var routes = (
  <Route name="app" path="/" handler={NotesApp}>
    <Route name="note" path="/notes/:noteId" handler={NoteItem}/>
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={LoginPage}/>
    <Route name="new-note" path="/new" handler={NoteNew}/>
    <DefaultRoute handler={Index}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

module.exports = routes;
