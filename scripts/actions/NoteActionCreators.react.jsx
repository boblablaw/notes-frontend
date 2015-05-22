var Dispatcher = require('../dispatcher/Dispatcher.js');
var Constants = require('../constants/Constants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  loadNotes: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_NOTES
    });
    WebAPIUtils.loadNotes();
  },
  
  loadNote: function(noteId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.LOAD_NOTE,
      noteId: noteId
    });
    WebAPIUtils.loadNote(noteId);
  },

  createNote: function(title, body) {
    Dispatcher.handleViewAction({
      type: ActionTypes.CREATE_NOTE,
      title: title,
      body: body
    });
    WebAPIUtils.createNote(title, body);
  },

  destroyNote: function(noteId) {
    Dispatcher.handleViewAction({
      type: ActionTypes.DESTROY_NOTE,
      noteId: noteId
    });
    WebAPIUtils.destroyNote(noteId);
  },

  updateNote: function(noteId, title, body) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_NOTE,
      noteId: noteId
    });
    WebAPIUtils.updateNote(noteId, title, body);
  }
};

