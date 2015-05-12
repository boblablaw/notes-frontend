var NotesAppDispatcher = require('../dispatcher/NotesAppDispatcher.js');
var NotesAppConstants = require('../constants/NotesAppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = NotesAppConstants.ActionTypes;

module.exports = {

  loadNotes: function() {
    NotesAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_NOTES
    });
    WebAPIUtils.loadNotes();
  },
  
  loadNote: function(noteId) {
    NotesAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_NOTE,
      noteId: noteId
    });
    WebAPIUtils.loadNote(noteId);
  },

  createNote: function(title, body) {
    NotesAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_NOTE,
      title: title,
      body: body
    });
    WebAPIUtils.createNote(title, body);
  }

};

