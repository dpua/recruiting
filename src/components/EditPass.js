import React, { Component, } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { userEditPassFetch } from '../redux/actions';
class EditPass extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    jwt: this.props.currentUser.jwt,
    email: this.props.currentUser.email,
    password_old: "",
    password: "",
    password_confirmation: "",
    submitted: false,
    pass_toggle: {},
    formErrors: { email: '', password_old: '', password: '', password_confirmation: '' },
    emailValid: true,
    password_oldValid: false,
    passwordValid: false,
    password_old_confirmationValid: false,
    password_confirmationValid: false,
    formValid: false,
    submitErrors: this.props.error ? this.props.error : ""
  }
  validateField(fieldName, value) {
    const intl = this.props.intl
    var fieldValidationErrors = this.state.formErrors;
    var emailValid = this.state.emailValid;
    var password_oldValid = this.state.password_oldValid;
    var passwordValid = this.state.passwordValid;
    var password_confirmationValid = this.state.password_confirmationValid;
    var password_old_confirmationValid = this.state.password_old_confirmationValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
        fieldValidationErrors.email = emailValid ? '' : intl.formatMessage({ id: "error.is_invalid" });
        break;
      case 'password_old':
        password_oldValid = value.length >= 6;
        fieldValidationErrors.password_old = password_oldValid ? '' : intl.formatMessage({ id: "error.is_too_short" });
        password_old_confirmationValid = value !== this.state.password;
        fieldValidationErrors.password_old_confirmation = password_old_confirmationValid ? '' : intl.formatMessage({ id: "error.equal_to_password_old" });
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : intl.formatMessage({ id: "error.is_too_short" });
        password_confirmationValid = value === this.state.password_confirmation;
        fieldValidationErrors.password_confirmation = password_confirmationValid ? '' : intl.formatMessage({ id: "error.not_equal_to_password" });
        password_old_confirmationValid = value !== this.state.password_old;
        fieldValidationErrors.password_old_confirmation = password_old_confirmationValid ? '' : intl.formatMessage({ id: "error.equal_to_password_old" });
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
      emailValid: emailValid,
      password_oldValid: password_oldValid,
      passwordValid: passwordValid,
      password_confirmationValid: password_confirmationValid,
      password_old_confirmationValid: password_old_confirmationValid,
      formValid: emailValid && passwordValid && password_oldValid && password_confirmationValid && password_old_confirmationValid
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
  handleEditPassSubmit = event => {
    event.preventDefault()
    this.setState({ submitted: true })
    if (!this.state.formValid) this.setState({ submitted: false });
    if (this.state.formValid) this.props.userEditPassFetch(this.state).then(items => {
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
  render() {
    return (
      < >
        <form className="form_edit_pass">
          <FormattedMessage id={'app.password_old'}>
            {(msg) => (<div className="input_pass_block">
              <input className="profile-field_input"
                placeholder={msg}
                id="signup-password_old"
                type={this.state.pass_toggle["signup-password_old"] ? 'text' : 'password'}
                name='password_old'
                value={this.state.password_old}
                onChange={this.handleChange}
                required
              />
              <input type="button" className={"pass_toggle" + (this.state.pass_toggle["signup-password_old"] ? ' active' : '')} name="signup-password_old" onClick={this.passToggle} value="" />
            </div>)}
          </FormattedMessage>
          <div className="input_error">{this.state.formErrors.password_old}</div>
          <FormattedMessage id={'app.password_new'}>
            {(msg) => (<div className="input_pass_block">
              <input className="profile-field_input"
                placeholder={msg}
                id="signup-password"
                type={this.state.pass_toggle["signup-password"] ? 'text' : 'password'}
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <input type="button" className={"pass_toggle" + (this.state.pass_toggle["signup-password"] ? ' active' : '')} name="signup-password" onClick={this.passToggle} value="" />
            </div>)}
          </FormattedMessage>
          <div className="input_error">{this.state.formErrors.password}</div>
          <div className="input_error">{this.state.formErrors.password_old_confirmation}</div>
          <FormattedMessage id={'app.password_new_again'}>
            {(msg) => (<div className="input_pass_block">
              <input className="profile-field_input"
                placeholder={msg}
                id="signup-password_confirmation"
                type={this.state.pass_toggle["signup-password_confirmation"] ? 'text' : 'password'}
                name='password_confirmation'
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                required
              />
              <input className={"pass_toggle" + (this.state.pass_toggle["signup-password_confirmation"] ? ' active' : '')} type="button" name="signup-password_confirmation" onClick={this.passToggle} value="" />
            </div>)}
          </FormattedMessage>
          <div className="input_error">{this.state.formErrors.password_confirmation}</div>
          <div className="btn-wrap">
            <button onClick={this.handleEditPassSubmit} className={`b_btn btn-green ${this.state.submitted ? "submitted" : ""}`} disabled={!this.state.formValid}>
              <FormattedMessage id="app.edit.pass" />
            </button>
          </div>
          <div className="input_error_popup">{this.state.submitErrors}</div>
        </form>
      </>
    )
  }
}
const mapStateToProps = state => ({
  currentUser: state.currentUser,
  error: state.error
})
const mapDispatchToProps = dispatch => ({
  userEditPassFetch: userInfo => dispatch(userEditPassFetch(userInfo))
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EditPass));