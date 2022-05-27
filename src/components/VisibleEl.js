import React, { Component, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
const { keyId, visible, ...other } = props;
let status = '';
const hiddenRef = new useRef();
const scrollHandler = useCallback(() => {
  if (window.pageYOffset + window.innerHeight >= hiddenRef.current.offsetTop) {
    if (status !== 'v') {
      console.log(`Element ${keyId} is now visible`, status);
      visible(true);
    }
    status = 'v';
  } else {
    if (status !== 'h') {
      console.log(`Element ${keyId} is not visible`, status);
      visible(false);
    }
    status = 'h';
    return status
  }
})
useEffect(() => {
  window.addEventListener('scroll', scrollHandler);
  return () => window.removeEventListener('scroll', scrollHandler);
}, [scrollHandler]);
class VisibleEl extends Component {
  state = {
    email: "",
    submitted: false
  }
  
  render() {
    return (<div ref={hiddenRef} className={(status === 'v') ? "show" : "hide"} {...other} />);
  }
}
export default connect(null, null)(VisibleEl);