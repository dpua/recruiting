import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {userPostForgot} from '../redux/actions';
class Forgot extends Component {
  state = {
    email: "",
    submitted: false
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault()
    this.setState({submitted: true})
    this.props.userPostForgot(this.state)   
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1><FormattedMessage id="app.forgot_your_password"/></h1>
        <div className="input-wrap">
          <input
            id="forgot-email"
            type='email'
            name='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChange} 
            required
            />
          <label className="placeholder" htmlFor="forgot-email"><FormattedMessage id="app.email"/></label>
        </div>
        <div className="btn-wrap">
          <button type='submit' className={`btn ${this.state.submitted ? "submitted" : ""}`}><FormattedMessage id="app.enter"/>
            <svg width="8.574358mm" height="9.8692408mm" viewBox="0 0 8.574358 9.8692408" version="1.1">
              <path  d="M 5.5116534,2.38803 2.2173964,0.38070997 c -0.514732,-0.22305 -1.85303797,0.0172 -1.90451297,1.37683003 l -0.01288,6.31798 c -0.0025,1.22139 1.39419097,1.80501 2.17474297,1.31254 l 5.404666,-3.40994 c 0.380397,-0.24 0.627785,-1.58927 0.05564,-2.02354 L 7.5835704,3.6878"/>
            </svg>
          </button>
        </div>
      </form>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  userPostForgot: userInfo => dispatch(userPostForgot(userInfo))
})
export default connect(null, mapDispatchToProps)(Forgot);