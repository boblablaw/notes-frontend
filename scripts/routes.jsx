var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Main = require('./components/Main.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');
var NoteItem = require('./components/notes/NoteItem.react.jsx');
var NotesPage = require('./components/notes/NotesPage.react.jsx');
var NoteNew = require('./components/notes/NoteNew.react.jsx');
var NoteEdit = require('./components/notes/NoteEdit.react.jsx');
var NotFound = require('./components/common/NotFound.react.jsx');
var Welcome = require('./components/Welcome.react.jsx');
var Index = require('./components/notes/Index.react.jsx');

var routes = (
  <Route name="app" path="/" handler={Main}>
    <Route name="welcome" path="/welcome" handler={Welcome}>
      <Route name="login" path="/login" handler={LoginPage}/>
      <Route name="signup" path="/signup" handler={SignupPage}/>
      <DefaultRoute handler={LoginPage}/>
      <NotFoundRoute handler={NotFound}/>
    </Route>
    <Route name="note" path="/notes/:noteId" handler={NoteItem}/>
    <Route name="new-note" path="/new" handler={NoteNew}/>
    <Route name="edit-note" path="/notes/:noteId/edit" handler={NoteEdit}/>
    <DefaultRoute handler={Index}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

module.exports = routes;
