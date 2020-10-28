import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Externals
// Material helpers
// Component styles
import compose from 'recompose/compose';


class Like extends Component {
  constructor(props) {
    super(props);
  }

  state = {};


  render() {
    return (
      <>
      <h1>Linkedin</h1>
      <p>Welcome to Linkedin!</p>
      </>
    );
  }
}

export default compose(
  withRouter
)(Like);

