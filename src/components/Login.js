import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userLoginFetch, clearMessage } from '../redux/actions';
import { Link } from 'react-router-dom';
import UserRedirect from './UserRedirect';
class Login extends Component {
  state = {
    email: "",
    password: "",
    submitted: false,
    pass_toggle: {},
    formErrors: { email: '', password: '' },
    emailValid: false,
    passwordValid: false,
    formValid: false,
    submitErrors: this.props.error ? this.props.error : ""
  }
  validateField(fieldName, value) {
    const intl = this.props.intl
    var fieldValidationErrors = this.state.formErrors;
    var emailValid = this.state.emailValid;
    var passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
        fieldValidationErrors.email = emailValid ? '' : intl.formatMessage({ id: "error.is_invalid" });
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : intl.formatMessage({ id: "error.is_too_short" });;
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      formValid: emailValid && passwordValid
    });
  }
  handleChange = event => {
    this.validateField(event.target.name, event.target.value);
    this.props.clearMessage()
    this.setState({
      [event.target.name]: event.target.value,
      submitErrors: ""
    });
  }
  handleSubmit = event => {
    event.preventDefault()
    this.setState({ submitted: true })
    if (!this.state.formValid) this.setState({ submitted: false });
    if (this.state.formValid) this.props.userLoginFetch(this.state).then(items => {
      this.formError(items);
    });
  }
  formError = event => {
    if (this.props.error) {
      this.setState({ submitted: false, submitErrors: this.props.error })
    };
  }
  passToggle = event => {
    event.preventDefault()
    let pass_toggle = this.state.pass_toggle
    pass_toggle[event.target.name] = !pass_toggle[event.target.name]
    this.setState({ pass_toggle: pass_toggle })
  }
  componentDidMount() {
    
    document.title = this.props.intl.formatMessage({ id: 'document.title.login' });
  }
  render() {
    return (
      <div className="main">
        <UserRedirect />
        <div id="register" className="table_header">
          <form onSubmit={this.handleSubmit}>
            <h1><strong><FormattedMessage id="app.login" /></strong></h1>
            <div className="input-wrap">
              <input className="input"
                id="login-email"
                type='email'
                name='email'
                placeholder='Email'
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label className="placeholder" htmlFor="login-email"><FormattedMessage id="app.email" /></label>
              <div className="input_error">{this.state.formErrors.email}</div>
            </div>
            <div className="input-wrap">
              <input className="input"
                id="login-password"
                type={this.state.pass_toggle["login-password"] ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <label className="placeholder" htmlFor="login-password"><FormattedMessage id="app.password" /></label>
              <input className={"pass_toggle" + (this.state.pass_toggle["login-password"] ? ' active' : '')} type="button" name="login-password" onClick={this.passToggle} value="" />
              <div className="input_error">{this.state.formErrors.password}</div>
            </div>
            {(this.props.error)?<FormattedMessage id = { this.props.error }/>:''}
            <div className="btn-wrap">
              <button type='submit' className={`b_btn btn-green${this.state.submitted ? " submitted" : ""}`} disabled={!this.state.formValid}>
                <FormattedMessage id="app.login" />
              </button>
            </div>
            <div className="input_error_popup">{this.state.submitErrors}</div>
            <p><FormattedMessage id="or" /> <Link to={`/register`}><FormattedMessage id="app.sign_up" /></Link></p>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  currentUser: state.currentUser,
  error: state.error
})
const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo)),
  clearMessage: () => dispatch(clearMessage())
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login));