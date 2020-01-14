import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
// Externals
// Material helpers
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

