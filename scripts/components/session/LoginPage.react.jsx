var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');

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

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(email, password);
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <div className="card card--login col-md-4 col-md-offset-4">
            <h3>Sign In</h3>
            <form onSubmit={this._onSubmit}>
              <div className="card--login__field">
                <p>
                  <label name="email">Email</label><br />
                  <input type="text" name="email" ref="email" /> 
                </p>
              </div>
              <div className="card--login__field">
                <p>
                  <label name="password">Password</label><br />
                  <input type="password" name="password" ref="password" />
                </p>
              </div>
              <button type="submit" className="btn btn-default">Sign In</button>
              <span className ="login"> Don't have an account? Sign Up!</span>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
