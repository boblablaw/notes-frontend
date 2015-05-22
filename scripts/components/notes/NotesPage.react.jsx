var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var NoteStore = require('../../stores/NoteStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');
var timeago = require('timeago');

var NotesPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      notes: NoteStore.getAllNotes(),
      errors: [],
      loading: true
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteActionCreators.loadNotes();
    this.setState({loading: false});
    this.context.router.transitionTo('/');
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
    var page = this.state.loading ? (
       <i className="fa fa-spinner fa-spin"></i>
    ) : (
      <div className="container">
        <div className="col-xs-4">
          <Link to="new-note">
            <button className="new-note btn btn-default">
              <i className="fa fa-plus-circle"></i> New Note
            </button>
          </Link>
          <div id="sidebar">
            <div>
              <div className="row">
                <NotesList notes={this.state.notes} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-8">
          <div><RouteHandler /></div>
        </div>
      </div>
    );
    return (
    <div>{page}</div>
    );
  }
});

var Item = React.createClass({
  render: function() {
    var params = { noteId: this.props.note.id };
    return (
      <div className="notes">
        <Link to="note" params={params}>
          <li>
            <div className="note-title">{this.props.note.title}</div>
            <div className="note-body">{this.props.note['abstract']}...</div>
            <span className="note-date">{timeago(this.props.note.updated_at)}</span>
          </li>
        </Link>
      </div>
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

module.exports = NotesPage;
