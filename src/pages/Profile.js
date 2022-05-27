import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import findGetParameter from '../components/FindGetParameter';
class Profile extends Component {
    state = {
        load: true,
        id: findGetParameter("id"),
        profile: {},
        close_popup: [true]
    }
    getProfile = () => {
        const id = findGetParameter("id")
        if (id) {
        } else {
            return <Redirect to={`/`} />
        }
    }
    componentDidMount() {
        // this.getProfile()
    }
    render() {
        return (
            <main className="main_wrapper_block">
            </main>
        )
    }
}
const mapStateToProps = state => ({
    currentUser: state.currentUser
})
const mapDispatchToProps = dispatch => ({
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Profile));