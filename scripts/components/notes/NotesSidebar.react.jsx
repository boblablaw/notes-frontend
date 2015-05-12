var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var NoteStore = require('../../stores/NoteStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');
var timeago = require('timeago');

var NotesSidebar = React.createClass({

  getInitialState: function() {
    return { 
      notes: NoteStore.getAllNotes(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNotes();
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

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <NotesList notes={this.state.notes} />
        </div>
      </div>
    );
  }
});

var NoteItem = React.createClass({
  render: function() {
    return (
      <li className="note">
        <div className="note__title">{this.props.note.title}</div>
        <div className="note__body">{this.props.note['abstract']}...</div>
        <span className="note__date">{timeago(this.props.note.created_at)}</span>
      </li>
    );
  }
});

var NotesList = React.createClass({
  render: function() {
    return (
      <ul className="large-8 medium-10 small-12 small-centered columns well">
        {this.props.notes.map(function(note, index){
          return <NoteItem note={note} key={"note-" + index}/>
        })}
      </ul>
    );
  }
});

module.exports = NotesSidebar;

