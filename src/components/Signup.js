import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { userSignupFetch } from '../redux/actions';
import { Link } from 'react-router-dom';
import UserRedirect from './UserRedirect';
class Signup extends Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "1",
    submitted: false,
    formErrors: { name: '', lastname: '', email: '', password: '', password_confirmation: '' },
    nameValid: false,
    lastnameValid: false,
    emailValid: false,
    passwordValid: false,
    password_confirmationValid: false,
    formValid: false,
    submitErrors: this.props.error ? this.props.error : ""
  }
  validateField(fieldName, value) {
    const intl = this.props.intl
    var fieldValidationErrors = this.state.formErrors;
    var nameValid = this.state.nameValid;
    var lastnameValid = this.state.lastnameValid;
    var emailValid = this.state.emailValid;
    var passwordValid = this.state.passwordValid;
    var password_confirmationValid = this.state.password_confirmationValid;
    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 2;
        fieldValidationErrors.name = nameValid ? '' : intl.formatMessage({ id: "error.is_too_short" });
        break;
      case 'lastname':
        lastnameValid = value.length >= 2;
        fieldValidationErrors.lastname = lastnameValid ? '' : intl.formatMessage({ id: "error.is_too_short" });
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
        fieldValidationErrors.email = emailValid ? '' : intl.formatMessage({ id: "error.is_invalid" });
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : intl.formatMessage({ id: "error.is_too_short" });
        password_confirmationValid = value === this.state.password_confirmation;
        fieldValidationErrors.password_confirmation = password_confirmationValid ? '' : intl.formatMessage({ id: "error.not_equal_to_password" });
        break;
      case 'password_confirmation':
        password_confirmationValid = value === this.state.password;
        fieldValidationErrors.password_confirmation = password_confirmationValid ? '' : intl.formatMessage({ id: "error.not_equal_to_password" });
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      lastnameValid: lastnameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      password_confirmationValid: password_confirmationValid,
      formValid: nameValid && lastnameValid && emailValid && passwordValid && password_confirmationValid
    });
  }
  handleChange = event => {
    var value = event.target.value.trim()
    this.validateField(event.target.name, value);
    this.setState({
      [event.target.name]: value,
      submitErrors: ""
    });
    console.log(value);
  }
  handleSubmit = event => {
    event.preventDefault()
    this.setState({ submitted: true })
    if (!this.state.formValid) this.setState({ submitted: false });
    if (this.state.formValid) this.props.userSignupFetch(this.state).then(items => {
      this.formError(items);
    });
  }
  formError = event => {
    if (this.props.error) {
      this.setState({ submitted: false, submitErrors: this.props.error })
    };
  }
  render() {
    return (
      <div className="main">
        <UserRedirect />
        <div id="register" className="table_header">
          <form onSubmit={this.handleSubmit}>
            <h1><strong><FormattedMessage id="app.sign_up" /></strong></h1>
            <div className="input-wrap">
              <input className="input"
                id="signup-name"
                type='text'
                name='name'
                placeholder='name'
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <label className="placeholder" htmlFor="signup-name"><FormattedMessage id="app.name" /></label>
              <div className="input_error">{this.state.formErrors.name}</div>
            </div>
            <div className="input-wrap">
              <input className="input"
                id="signup-lastname"
                type='text'
                name='lastname'
                placeholder='lastname'
                value={this.state.lastname}
                onChange={this.handleChange}
                required
              />
              <label className="placeholder" htmlFor="signup-lastname"><FormattedMessage id="app.lastname" /></label>
              <div className="input_error">{this.state.formErrors.lastname}</div>
            </div>
            <div className="input-wrap">
              <input className="input"
                id="signup-email"
                type='email'
                name='email'
                placeholder='Email'
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label className="placeholder" htmlFor="signup-email"><FormattedMessage id="app.email" /></label>
              <div className="input_error">{this.state.formErrors.email}</div>
            </div>
            <div className="input-wrap">
              <input className="input"
                id="signup-password"
                type='password'
                name='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <label className="placeholder" htmlFor="signup-password"><FormattedMessage id="app.password" /></label>
              <div className="input_error">{this.state.formErrors.password}</div>
            </div>
            <div className="input-wrap">
              <input className="input"
                id="signup-password_confirmation"
                type='password'
                name='password_confirmation'
                placeholder='Password again'
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                required
              />
              <label className="placeholder" htmlFor="signup-password_confirmation"><FormattedMessage id="app.password_again" /></label>
              <div className="input_error">{this.state.formErrors.password_confirmation}</div>
            </div>
            <div className="btn-wrap">
              <button type='submit' className={`b_btn btn-green ${this.state.submitted ? "submitted" : ""}`} disabled={!this.state.formValid}>
                <FormattedMessage id="app.sign_up" />
              </button>
            </div>
            <div className="input_error_popup">{this.state.submitErrors}</div>
            <p><FormattedMessage id="or" /> <Link to={`/login`}><FormattedMessage id="app.login" /></Link></p>
          </form>
          <div className="button-wrapper"><span id="go_to_advantages" className="button-down-white"></span></div>
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
  userSignupFetch: userInfo => dispatch(userSignupFetch(userInfo))
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Signup));