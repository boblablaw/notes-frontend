var NotesAppDispatcher = require('../dispatcher/NotesAppDispatcher.js');
var NotesAppConstants = require('../constants/NotesAppConstants.js');

var ActionTypes = NotesAppConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    NotesAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveNotes: function(json) {
    NotesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_NOTES,
      json: json
    });
  },

  receiveNote: function(json) {
    NotesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_STORY,
      json: json
    });
  },
  
  receiveCreatedNote: function(json, errors) {
    NotesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_STORY,
      json: json,
      errors: errors
    });
  }
};