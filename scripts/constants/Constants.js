var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3002";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/v1/login",
    REGISTRATION:   APIRoot + "/v1/users",
    NOTES:          APIRoot + "/v1/notes"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,

    // Notes
    LOAD_NOTES: null,
    RECEIVE_NOTES: null,
    LOAD_NOTE: null,
    RECEIVE_NOTE: null,
    CREATE_NOTE: null,
    DESTROY_NOTE: null,
    UPDATE_NOTE: null,
    RECEIVE_CREATED_NOTE: null,
    PROCESS_DELETED_NOTE: null,
    PROCESS_UPDATED_NOTE: null
  })
};
