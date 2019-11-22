import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import {
    Button,
    CircularProgress,
    Grid, TextField,
    withStyles
} from '@material-ui/core';

import {
    Dashboard as DashboardLayout

} from 'layouts';
// Component styles
import styles from './styles';
import Typography from '@material-ui/core/Typography';
// Shared components
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent
} from 'components';
import {handleFieldChange} from 'services/form';
import schema from "./schema";
import compose from "recompose/compose";
import SelectField from "../components/SelectField";

import {youtubeTypes} from 'constants/constants.js';
import PortletFooter from "../../../components/PortletFooter";




class Youtube extends Component {
    state = {
        isLoading: false,
        isValid: false,
        submitError: false,
        serviceError: null,
        values: {
            link: '',
            target_type: 'keyword',
            keyword: ''
        },
        touched: {
            link: false,
            target_type: false,
            keyword: false
        },
        errors: {
            link: null,
            target_type: null,
            keyword: null
        }
    };

    render() {

        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        const {
            isLoading,
            values,
            touched,
            errors,
            isValid,
            submitError,
            serviceError
        } = this.state;
        const showLinkError = touched.link && errors.link;

        this.prevState = this.props.location.state;



        return (
            <div className={rootClassName}>

                <div className={classes.keyWordsHeader}>
                    <PortletLabel
                        title="Search By Keywords"
                        subtitle="you can get results directly from video link and channel link too"
                    />
                </div>
                <PortletContent
                    noPadding
                >
                    <Grid item className={classes.keyWordsBody}>
                        {values.target_type === 'keyword' ? (
                            <div className={classes.fieldDiv}>
                                <TextField
                                    className={classes.textField}
                                    label="Keyword"
                                    margin="dense"
                                    variant="outlined"
                                    name="Keyword"
                                    onChange={event =>
                                        handleFieldChange(this,'keyword', event.target.value,schema)
                                    }
                                    type="text"
                                    value={values.keyword}
                                >
                                </TextField>
                                {showLinkError && (
                                    <Typography
                                        className={classes.fieldError}
                                        variant="body2"
                                    >
                                        {errors.keyword[0]}
                                    </Typography>
                                )}
                            </div>
                        ) : (
                            <div className={classes.fieldDiv}>
                                <TextField
                                    className={classes.textField}
                                    label={values.target_type+" Link"}
                                    margin="dense"
                                    variant="outlined"
                                    name={values.target_type+ " Link"}
                                    onChange={event =>
                                        {
                                            handleFieldChange(this,'link', event.target.value,schema)
                                        }
                                    }
                                    type="text"
                                    value={values.link}
                                >
                                </TextField>
                                {showLinkError && (
                                    <Typography
                                        className={classes.fieldError}
                                        variant="body2"
                                    >
                                        {errors.link[0]}
                                    </Typography>
                                )}
                            </div>
                        )

                        }
                        <div className={classes.selectTypeYoutube}>
                            <SelectField
                                value={values.target_type}
                                getValue={ (value) =>
                                    {
                                        // const newState = {...this.state};
                                        // if (this.state.values.target_type !== 'keyword'){
                                        //     newState.values['link'] = '';
                                        // } else {
                                        //     newState.values['link'] = '';
                                        //     newState.values['keyword'] = 'dummy';
                                        // }
                                        // this.setState(newState);
                                        handleFieldChange(this, 'target_type', value, schema)
                                    }
                                }
                                options={youtubeTypes} label={"Type"}
                            />
                        </div>
                    </Grid>
                </PortletContent>
                <PortletFooter>
                    <div className={classes.registerJob}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={()=>this.handleSendLink()}
                            disabled={!isValid}
                        >
                            Register Job
                        </Button>
                        {isLoading && (<CircularProgress size={30}  className={classes.loading}/>) }
                    </div>
                </PortletFooter>
            </div>
        );
    }

    async handleSendLink() {
        console.log('here');
        console.log(this.state.values);
        this.setState({
            isLoading: true,
        });
    }
}

Youtube.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default compose(
    withRouter,
    withStyles(styles),
)(Youtube);

