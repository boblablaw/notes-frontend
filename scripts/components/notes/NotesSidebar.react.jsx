var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var NoteStore = require('../../stores/NoteStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
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

var Item = React.createClass({
  render: function() {
  var params = { noteId: this.props.note.id };
    return (
      <span className="notes">
        <li key={this.props.note.title}>
          <Link to="note" params={params}>
            <div className="note-title">{this.props.note.title}</div>
            <div className="note-body">{this.props.note['abstract']}...</div>
            <span className="note-date">{timeago(this.props.note.created_at)}</span>
          </Link>
        </li>
      </span>
    );
  }
});

var NotesList = React.createClass({
  render: function() {
    return (
      <ul className="notes">
        {this.props.notes.map(function(note, index){
          return <Item note={note} key={"note-" + index}/>
        })}
      </ul>
    );
  }
});

module.exports = NotesSidebar;

