import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getProfileFetch, clearMessage } from './redux/actions';


class App extends Component {
    // componentDidMount = () => {
    //   this.props.getProfileFetch()
    // }
    state = {
        error: this.props.error,
        message: this.props.message
    }

    handleClick = event => {
        event.preventDefault()
        this.props.clearMessage()
        this.setState({ error: null, message: null })
    }

    render() {
        return ( <> {
                this.props.error ? ( < div className = "error_popup"
                    onClick = { this.handleClick.bind(this) } > < FormattedMessage id = { this.props.error }
                    /></div > ) : ''
            } {
                this.props.message ? ( < div className = "message_popup"
                    onClick = { this.handleClick.bind(this) } > < FormattedMessage id = { this.props.message }
                    /></div > ) : ''
            } </>)
        }
    }



    const mapStateToProps = state => ({
        currentUser: state.currentUser,
        message: state.message,
        error: state.error
            //currentUser: state.reducer.currentUser
    })

    const mapDispatchToProps = dispatch => ({
        getProfileFetch: () => dispatch(getProfileFetch()),
        clearMessage: () => dispatch(clearMessage())
    })

    export default connect(mapStateToProps, mapDispatchToProps)(App);