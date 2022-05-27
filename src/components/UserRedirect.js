import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class UserRedirect extends Component {
    renderRedirect = () => {
        console.log("<Redirect to={`"+this.props.currentUser.role+"`} />")
        console.log(this.props.currentUser.role === "1")
        if (this.props.currentUser.jwt) {
            this.setState({ submitted: false })
            console.log(this.props.currentUser.jwt)
            if (this.props.currentUser.role === "0") {
                return <Redirect to = { `/` }  />
            }
            if (this.props.currentUser.role === "1") {
                return <Redirect to = { `/dashboard?tab=my_profile` }  />
            }
            if (this.props.currentUser.role === "2") {
                return <Redirect to = { `/dashboard?tab=my_profile` }  />
            }
            if (this.props.currentUser.role === "3") {
                return <Redirect to = { `/dashboard?tab=my_profile` }  />
            }
            return <Redirect to = { `/` }
            />
        }else{
            return ''
        }
    }
    render() {
        return (<>{this.renderRedirect()}</>)
    }
}
const mapStateToProps = state => ({
    currentUser: state.currentUser
})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(UserRedirect);