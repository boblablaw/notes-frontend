var React = require('react');
var NotesAppDispatcher = require('../../dispatcher/NotesAppDispatcher.js');
var NotesAppConstants = require('../../constants/NotesAppConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var NoteActionCreators = require('../../actions/NoteActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');

var NoteNew = React.createClass({
  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('app');
    }
    React.findDOMNode(this.refs.title).focus();
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value;
    var body = this.refs.body.getDOMNode().value;
    NoteActionCreators.createNote(title, body);
  },

  render: function() {
    return (
      <div className="row">
        <form onSubmit={this._onSubmit} className="new-note">
          <div className="new-note__title">
            <input type="text" placeholder="Title" name="title" ref="title" />
          </div>
          <div className="new-note__body">
            <textarea rows="10" placeholder="Your note..." name="body" ref="body" />
          </div>
          <div className="new-note__submit">
            <button type="submit" className="new-note btn btn-default">Create</button>
          </div>
         </form>
       </div>
     );
  }

});

module.exports = NoteNew;
