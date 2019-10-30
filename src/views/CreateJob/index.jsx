import React, {Component} from 'react';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
// Externals
import PropTypes from 'prop-types';
// Material helpers
import {
    withStyles
} from '@material-ui/core';

import {
    Dashboard as DashboardLayout
} from 'layouts';

// Component styles
import styles from './styles';
import Twitter from './Twitter'
import Paper from '@material-ui/core/Paper';
import Facebook from './Facebook'

class CreateJob extends Component {
    constructor(props) {
        super(props);


        this.handleChange = this.handleChange.bind(this);
    }

    signal = false;
    state = {
        value: 'twitter',
    };

    handleChange(event) {
        console.log(event.target.value);
        this.setState({
            value: event.target.value
        })
    }

    render() {
        const {classes, className, ...rest} = this.props;
        return (
            <DashboardLayout title="Initialize User" initUser={false}>
                <Paper className={classes.paper}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Please Select Platform</FormLabel>
                        <RadioGroup
                            row
                            aria-label="Please Select Platform"
                            name="platform"
                            className={classes.group}
                            value={this.state.value}
                            onChange={this.handleChange}
                        >

                            <FormControlLabel
                                className={classes.platformTwitter}
                                value="twitter"
                                control={<Radio color="primary"/>}
                                label="Twitter"
                            />
                            <FormControlLabel
                                className={classes.platformFacebook}
                                value="facebook"
                                control={<Radio color="primary"/>}
                                label="Facebook"
                            />
                            <FormControlLabel
                                className={classes.platformInsta}
                                value="instagram"
                                control={<Radio color="primary"/>}
                                label="Instagram"
                            />
                        </RadioGroup>
                    </FormControl>
                    {this.state.value === "twitter" ? <Twitter/> : <Facebook/>}
                </Paper>

            </DashboardLayout>
        );
    }
}

CreateJob.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateJob);

