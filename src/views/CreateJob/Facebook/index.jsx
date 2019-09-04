import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';
// Material helpers
import {
    withStyles,
} from '@material-ui/core';

// Component styles
import compose from 'recompose/compose';





class Facebook extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        
    };

    
    render() {
        return (
           <h1>Facebook</h1>
        );
    }
}

export default compose(
    withRouter,
)(Facebook);

