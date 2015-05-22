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
            <FormInput
              type="email"
              name="email"
              validations="isEmail"
              validationError="This is not a valid email" required
            />
          </p>
          <p>
            <label name="password">Password</label><br />
            <FormInput
              type="password"
              name="password"
            />
          </p>
        </div>
        <button type="submit" disabled={!this.state.canSubmit} className="btn btn-default">Submit</button>
        <span className="login">
          Don't have an account? <Link to="signup"> Sign Up!</Link>
        </span>
      </Formsy.Form>
    );
  }
});

var FormInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },

  render: function () {
    var color = 'gray';

    if (this.showError()) {
      color = 'red';
    };

    var border = {
      border: '1px solid ' + color
    };

    var formState = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
    var errorMessage = this.getErrorMessage();

    return (
      <div className={formState}>
        <input type={this.props.type ? this.props.type : 'text'} style={border} onBlur={this.changeValue}/>
        <span>{errorMessage}</span>
      </div>
    );
  }
});

var LoginPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

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
