var Dispatcher = require('../dispatcher/Dispatcher.js');
var Constants = require('../constants/Constants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _notes = [];
var _errors = [];
var _note = { title: "", body: "", user: { username: "" } };

var NoteStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllNotes: function() {
    return _notes;
  },

  getNote: function() {
    return _note;
  },

  getErrors: function() {
    return _errors;
  }

});

NoteStore.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_NOTES:
      _notes = action.json.notes;
      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_NOTE:
      if (action.json) {
        _notes.unshift(action.json.note);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      NoteStore.emitChange();
      break;

    case ActionTypes.RECEIVE_UPDATED_NOTE:
      if (action.json) {
      }
      if (action.errors) {
        _errors = action.errors;
      }
      NoteStore.emitChange();
      break;
    
    case ActionTypes.RECEIVE_NOTE:
      if (action.json) {
        _note = action.json.note;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      NoteStore.emitChange();
      break;

    case ActionTypes.PROCESS_DELETED_NOTE:
      if (action.noteId) {
        var notes = _notes.filter(function (note) {
          return note.id != action.noteId;
        });
        _notes = notes;
      }
      if (action.errors) {
        _errors = action.errors;
      }
      NoteStore.emitChange();
      break;

    case ActionTypes.PROCESS_UPDATED_NOTE:
      if (action.json) {
        var searchTerm = action.json.note.id, index = -1;
        var notes = _notes;
        for(var i = 0, len = notes.length; i < len; i++) {
          if (notes[i].id === searchTerm) {
              index = i;
              break;
          }
        }
        notes[index].title = action.json.note.title;
        notes[index].body = action.json.note.body;
        notes[index].abstract = action.json.note.abstract;
        notes[index].updated_at = action.json.note.updated_at;

        _notes = notes;
      }
      if (action.errors) {
        _errors = action.errors;
      }
      NoteStore.emitChange();
      break;
  }

  return true;
});

module.exports = NoteStore;
