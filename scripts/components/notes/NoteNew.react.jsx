var React = require('react');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');
var NoteStore = require('../../stores/NoteStore.react.jsx');

var NoteNew = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      notes: NoteStore.getAllNotes(),
      errors: []
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNotes();
    React.findDOMNode(this.refs.title).focus();
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      notes: NoteStore.getAllNotes(),
      errors: NoteStore.getErrors()
    });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value;
    var body = this.refs.body.getDOMNode().value;
    NoteActionCreators.createNote(title, body);
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this._onSubmit} className="note-item well">
          <div className="new-note__title">
            <input type="text" placeholder="Title" name="title" ref="title" />
          </div>
          <div className="new-note__body">
            <textarea rows="10" placeholder="Your note..." name="body" ref="body" />
          </div>
          <div className="new-note_submit">
            <button type="submit" className="create-note btn btn-default">
              <i className="fa fa-trash-o"></i> Create
            </button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = NoteNew;
