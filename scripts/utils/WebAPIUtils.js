var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var Constants = require('../constants/Constants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = Constants.APIEndpoints;

module.exports = {
  signup: function(email, username, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: { 
        email: email, 
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ username: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  loadNotes: function() {
    request.get(APIEndpoints.NOTES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveNotes(json);
        }
      });
  },

  loadNote: function(noteId) {
    request.get(APIEndpoints.NOTES + '/' + noteId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveNote(json);
        }
      });
  },

  createNote: function(title, body) {
    request.post(APIEndpoints.NOTES)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ note: { title: title, body: body } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedNote(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedNote(json, null);
          }
        }
      });
  },

  destroyNote: function(noteId) {
    request.del(APIEndpoints.NOTES + '/' + noteId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ note: { id: noteId } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.processDeletedNote(noteId);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.processDeletedNote(noteId);
          }
        }
      });
  },

  updateNote: function(noteId, title, body) {
    request.put(APIEndpoints.NOTES + '/' + noteId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ note: { title: title, body: body }})
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.processUpdatedNote(json)
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.processUpdatedNote(json);
          }
        }
      });
  },
};
