import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class HowItWorks extends Component {
  componentDidMount = () => {
  }
  render() {
    return (
      <div className="main_wrapper">
        <div className="main_wrapper_block">
          <div className="main_wrapper_block_content_stretch">
            <h1><FormattedMessage id="privacy_policy" /></h1>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.currentUser
})
export default connect(mapStateToProps, null)(HowItWorks);
