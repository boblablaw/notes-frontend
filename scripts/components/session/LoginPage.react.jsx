var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var Formsy = require('formsy-react');
var SignupPage = require('../../components/session/SignupPage.react.jsx');

var LoginForm = React.createClass({
  getInitialState: function() {
    return { canSubmit: false };
  },

  enableButton: function () {
    this.setState({canSubmit: true});
  },

  disableButton: function () {
    this.setState({canSubmit: false});
  },

  _onSubmit: function(model) {
    this.setState({ errors: [] });
    var email = model.email;
    var password = model.password;
    SessionActionCreators.login(email, password);
  },

  render: function () {
    return (
      <Formsy.Form onValidSubmit={this._onSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <h3>Sign In</h3>
        <div className="card--login__field">
          <p>
            <label name="email">Email</label>
            <EmailInput
              name="email"
              validations="isEmail"
              validationError="This is not a valid email" required
            />
          </p>
          <p>
            <label name="password">Password</label><br />
            <PasswordInput name="password"/>
          </p>
        </div>
        <button type="submit" disabled={!this.state.canSubmit} className="btn btn-default">Submit</button>
        <span className="login">
        Don't have an account? Sign Up!
        </span>
      </Formsy.Form>
    );
  }
});

var EmailInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    var formState = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    var errorMessage = this.getErrorMessage();

    return (
      <div className={formState}>
        <input type="text" onChange={this.changeValue} value={this.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    );
  }
});

var PasswordInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    var formState = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    var errorMessage = this.getErrorMessage();

    return (
      <div className={formState}>
        <input type="password" onChange={this.changeValue} value={this.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    );
  }
});

var LoginPage = React.createClass({
  getInitialState: function() {
    return { errors: [] };
  },
 
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
          <div className="card card--login col-md-4 col-md-offset-4 col-xs-4 col-xs-offset-4">
            <LoginForm />
          </div>
      </div>
    );
  }
});

module.exports = LoginPage;
