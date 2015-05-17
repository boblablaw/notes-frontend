var NotesAppDispatcher = require('../dispatcher/NotesAppDispatcher.js');
var NotesAppConstants = require('../constants/NotesAppConstants.js');

var ActionTypes = NotesAppConstants.ActionTypes;

module.exports = {
  redirect: function(route) {
    NotesAppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }
};
