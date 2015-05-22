var Dispatcher = require('../dispatcher/Dispatcher.js');
var Constants = require('../constants/Constants.js');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveNotes: function(json) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_NOTES,
      json: json
    });
  },

  receiveNote: function(json) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_NOTE,
      json: json
    });
  },
  
  processDeletedNote: function(noteId) {
    Dispatcher.handleServerAction({
      type: ActionTypes.PROCESS_DELETED_NOTE,
      noteId: noteId
    });
  },

  receiveCreatedNote: function(json, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_NOTE,
      json: json,
      errors: errors
    });
  },

  processUpdatedNote: function(json, noteId, errors) {
    Dispatcher.handleServerAction({
      type: ActionTypes.PROCESS_UPDATED_NOTE,
      json: json,
      noteId: noteId,
      errors: errors
    });
  }
};
