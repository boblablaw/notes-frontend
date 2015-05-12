var NotesAppDispatcher = require('../dispatcher/NotesAppDispatcher.js');
var NotesAppConstants = require('../constants/NotesAppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = NotesAppConstants.ActionTypes;

module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    NotesAppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, username, password, passwordConfirmation);
  },

  login: function(email, password) {
    NotesAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  logout: function() {
    NotesAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
};