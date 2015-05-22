var React = require('react');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');
var NoteStore = require('../../stores/NoteStore.react.jsx');
var NoteNew = require('../../components/notes/NoteEdit.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var State = Router.State;

var NoteEdit = React.createClass({
  mixins: [ State ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      note: NoteStore.getNote(),
      errors: []
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNote(this.props.params.noteId);
    React.findDOMNode(this.refs.title).focus();
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  onTitleChange: function(event) {
    this.state.note.title = event.target.value;
    this.setState({ note: this.state.note });
  },

  onBodyChange: function(event) {
    this.state.note.body = event.target.value;
    this.setState({ note: this.state.note });
  },

  _onChange: function() {
    this.setState({
      note: NoteStore.getNote(),
      errors: NoteStore.getErrors()
    });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    NoteActionCreators.updateNote(this.props.params.noteId, this.state.note.title, this.state.note.body);
    this.context.router.transitionTo('/notes/' + this.props.params.noteId );
  },

  render: function() {
    var params = { noteId: this.props.params.noteId };
    return (
      <div className="well">
        <form onSubmit={this._onSubmit} className="note-item">
          <div className="new-note__title">
            <input
              type="text"
              defaultValue={this.state.note.title}
              onChange={this.onTitleChange}
              ref="title" />
          </div>
          <div className="new-note__body">
            <textarea
              rows="10"
              defaultValue={this.state.note.body}
              onChange={this.onBodyChange}
              ref="body" />
          </div>
          <div>
            <button type="submit" className="update-note btn btn-default">Update</button>
            <Link to="note" params={params}>
              <button className="cancel-note btn btn-default">Cancel</button>
            </Link>
          </div>

        </form>
      </div>
    );
  }
});

module.exports = NoteEdit;
