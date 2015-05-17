var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var NoteStore = require('../../stores/NoteStore.react.jsx');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');
var Router = require('react-router');
var State = require('react-router').State;

var NoteItem = React.createClass({
  mixins: [ State ],

  getInitialState: function() {
    return {
      note: NoteStore.getNote(),
      errors: []
    };
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNote(this.getParams().noteId);
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps: function () {
    NoteActionCreators.loadNote(this.getParams().noteId);
  },

  _onChange: function() {
    this.setState({
      note: NoteStore.getNote(),
      errors: NoteStore.getErrors()
    });
  },

  render: function() {
    return (
      <div className="note-item">
        <div className="note-item__title">{this.state.note.title}</div>
        <div className="note-item__body">{this.state.note.body}</div>
      </div>
    );
  }
});

module.exports = NoteItem;
