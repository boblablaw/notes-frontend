var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var NoteStore = require('../../stores/NoteStore.react.jsx');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');

var NotePage = React.createClass({

  getInitialState: function() {
    return { 
      note: NoteStore.getNote(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNote();
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      note: NoteStore.getNote(),
      errors: NoteStore.getErrors()
    }); 
  },
  
  render: function() {
    return (
      <div className="row">
        <div className="note__title">{this.state.note.title}</div>
        <div className="note__body">{this.state.note.body}</div>
        <div className="note__user">{this.state.note.user.username}</div>
      </div>
    );
  }
});

module.exports = NotePage;