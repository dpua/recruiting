import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDeviceID, getProfileFetch, logoutUser, switchMenu } from '../redux/actions';
import { Redirect } from 'react-router-dom';
class Logout extends Component {
  componentDidMount = () => {
    this.props.getProfileFetch()
    console.log("~~~~this.props: ", this.props)
  }
  state = {
    redirect: false
  }
  handleClick = event => {
    event.preventDefault()
    localStorage.removeItem("token")
    this.props.logoutUser()
    console.log("Redirect to=/")
    this.setState({ redirect: true })
  }
  render() {
    if (!this.props.deviceID?.validation) this.props.getDeviceID();
    console.log("~~~~deviceID: ", this.props.deviceID);
    console.log("~~~~this.props.currentUser: ", this.props.currentUser);
    return (this.props.currentUser.jwt) ? (
      <div className="drop_menu">
        {(this.state.redirect) ? <Redirect to="/" /> : ''}
        <div className="drop_menu-current">
          {(this.props.currentUser?.avatar?.src) ?
            <div className="avatar_preview" style={{ backgroundImage: "url('" + this.props.currentUser.avatar.src + "')" }} /> :
            <img className="avatar_preview" src="./images/users_info_box_no_images-min.png" />}
          <span className="arrow">
            <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 477.2 252.2">
              <g>
                <path className="st0" d="M238.6,219.5L23.1,4C17.8-1.3,9.3-1.3,4,4s-5.3,13.8,0,19.1l225.1,225.1c5.3,5.3,13.8,5.3,19.1,0l225-225.1c2.6-2.6,4-6.1,4-9.5s-1.3-6.9-4-9.5c-5.3-5.3-13.8-5.3-19.1,0L238.6,219.5z"></path>
              </g>
            </svg>
          </span>
        </div>
        <ul className="drop_menu-dropdown">
          <li><FormattedMessage id={"role." + this.props.currentUser.role} /></li>
          {(this.props.currentUser.role === 3) ? <>
            <li><Link className="b_menu__item" to={`/dashboard?tab=my_profile`}><FormattedMessage id="client_profile" /></Link></li>
          </> : ''}
          {(this.props.currentUser.role === 2) ? <>
            <li><Link className="b_menu__item" to={`/dashboard?tab=my_profile`}><FormattedMessage id="client_profile" /></Link></li>
          </> : ''}
          {(this.props.currentUser.role === 1) ? <>
            <li><Link className="b_menu__item" to={`/dashboard?tab=my_profile`}><FormattedMessage id="client_profile" /></Link></li>
          </> : ''}
          {(this.props.currentUser.role === 0) ? <>
            <li><Link className="b_menu__item" to={`/dashboard?tab=my_profile`}><FormattedMessage id="client_profile" /></Link></li>
          </> : ''}
          <li><button onClick={this.handleClick}><FormattedMessage id="app.log_out" /></button></li>
        </ul>
      </div>
      // <div id="menu_icon" onClick={this.handleClick}><FormattedMessage id="app.log_out"/></div>
    ) : (<>
      <div className="drop_menu">
        <div className="drop_menu-current">
          <Link to={`/login`}><FormattedMessage id="app.login" /></Link>
          {/* <span className="arrow">
                  <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 477.2 252.2">
                      <g>
                          <path className="st0" d="M238.6,219.5L23.1,4C17.8-1.3,9.3-1.3,4,4s-5.3,13.8,0,19.1l225.1,225.1c5.3,5.3,13.8,5.3,19.1,0l225-225.1c2.6-2.6,4-6.1,4-9.5s-1.3-6.9-4-9.5c-5.3-5.3-13.8-5.3-19.1,0L238.6,219.5z"></path>
                      </g>
                  </svg>
              </span> */}
        </div>
      </div>
      {/* <div id="menu_icon"><Link to={`/login`}><FormattedMessage id="app.login"/></Link></div> */}
      <p style={{ fontSize: "12px" }}>[{this.props.deviceID?.browser} - {this.props.deviceID?.os}]</p>
    </>
    );
  }
}
const mapStateToProps = state => ({
  deviceID: state.deviceID,
  currentUser: state.currentUser
})
console.log("mapStateToProps", mapStateToProps)
const mapDispatchToProps = dispatch => ({
  getDeviceID: () => dispatch(getDeviceID()),
  getProfileFetch: () => dispatch(getProfileFetch()),
  logoutUser: () => dispatch(logoutUser()),
  switchMenu: () => dispatch(switchMenu())
})
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
