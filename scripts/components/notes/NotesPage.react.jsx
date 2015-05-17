var React = require('react');
var NotesSidebar = require('../../components/notes/NotesSidebar.react.jsx');
var RouteHandler = require('react-router').RouteHandler;
var Router = require('react-router');
var Link = Router.Link;

var NotesPage = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="col-xs-4">
        <Link to="new-note">
        <button className="new-note btn btn-default">
          <i className="fa fa-plus-circle"></i> New Note
        </button>
          </Link>
          <div id="sidebar"><NotesSidebar/></div>
        </div>
        <div className="col-xs-8">
          <div><RouteHandler /></div>
        </div>
      </div>
    );
  }
});

module.exports = NotesPage;
