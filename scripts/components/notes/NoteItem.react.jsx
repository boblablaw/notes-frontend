var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var NoteStore = require('../../stores/NoteStore.react.jsx');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');
var NoteNew = require('../../components/notes/NoteEdit.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var State = Router.State;

var NoteItem = React.createClass({
  mixins: [ State ],

  getInitialState: function() {
    return {
      note: NoteStore.getNote(),
      errors: []
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNote(this.getParams().noteId);
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.params.noteId !== this.props.params.noteId) {
      NoteActionCreators.loadNote(this.getParams().noteId);
    }
  },

  _onChange: function() {
    this.setState({
      note: NoteStore.getNote(),
      errors: NoteStore.getErrors()
    });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    NoteActionCreators.destroyNote(this.getParams().noteId);
    this.context.router.transitionTo('/');
  },

  render: function() {
  var params = { noteId: this.getParams().noteId, title: this.state.note.title, body: this.state.note.body };
    return (
      <div className="well">
        <div className="note-item">
          <div className="note-item__title">{this.state.note.title}</div>
          <div className="note-item__body">{this.state.note.body}</div>
        </div>
        <div className="new-note_submit">
          <form onSubmit={this._onSubmit}>
            <Link to="edit-note" params={params}>
              <button className="edit-note btn btn-default">
                <i className="fa fa-edit"></i>  Edit
              </button>
            </Link>
            <button className="delete-note btn btn-default">
              <i className="fa fa-trash-o"></i>  Delete
            </button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NoteItem;
