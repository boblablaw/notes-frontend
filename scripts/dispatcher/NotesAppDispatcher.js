var NotesAppConstants = require('../constants/NotesAppConstants.js');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = NotesAppConstants.PayloadSources;

var NotesAppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    // Dirty hack to stop error message
    if(NotesAppDispatcher.isDispatching()==true) { return; }

    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = NotesAppDispatcher;
