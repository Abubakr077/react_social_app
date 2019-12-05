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

// Component styles
import styles from './styles';
import Typography from '@material-ui/core/Typography';
// Shared components
import {

    PortletLabel,
    PortletContent
} from 'components';
import {handleFieldChange} from 'services/form';
import compose from "recompose/compose";
import SelectField from "../components/SelectField";

import {youtubeTypes} from 'constants/constants.js';
import PortletFooter from "../../../../../../components/PortletFooter";




class Youtube extends Component {
    state = {
        isLoading: false,
        isValid: false,
        submitError: false,
        serviceError: null,
        values: {
            video: '',
            channel: '',
            target_type: 'keyword',
            keyword: ''
        },
        touched: {
            video: false,
            channel: false,
            target_type: false,
            keyword: false
        },
        errors: {
            video: null,
            channel: null,
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
            isValid
        } = this.state;
        const showVideoError = touched.video && errors.video;
        const showChannelError =  touched.channel && errors.channel;
        const showKeywordError = touched.keyword && errors.keyword;
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
                                        handleFieldChange(this,'keyword', event.target.value,this.schema)
                                    }
                                    type="text"
                                    value={values.keyword}
                                >
                                </TextField>
                                {showKeywordError && (
                                    <Typography
                                        className={classes.fieldError}
                                        variant="body2"
                                    >
                                        {errors.keyword[0]}
                                    </Typography>
                                )}
                            </div>
                        ) : values.target_type === 'video' ? (
                                    <div className={classes.fieldDiv}>
                                        <TextField
                                            className={classes.textField}
                                            label={"Video Link"}
                                            margin="dense"
                                            variant="outlined"
                                            name={"Video Link"}
                                            onChange={event =>
                                            {
                                                handleFieldChange(this,'video', event.target.value,this.schema)
                                            }
                                            }
                                            type="text"
                                            value={values.video}
                                        />
                                        {showVideoError && (
                                            <Typography
                                                className={classes.fieldError}
                                                variant="body2"
                                            >
                                                {errors.video[0]}
                                            </Typography>
                                        )}
                                    </div>
                        ) : values.target_type === 'channel' && (
                            <div className={classes.fieldDiv}>
                                <TextField
                                    className={classes.textField}
                                    label={"Channel Link"}
                                    margin="dense"
                                    variant="outlined"
                                    name={"Channel Link"}
                                    onChange={event =>
                                    {
                                        handleFieldChange(this,'channel', event.target.value,this.schema)
                                    }
                                    }
                                    type="text"
                                    value={values.channel}
                                />
                                {showChannelError && (
                                    <Typography
                                        className={classes.fieldError}
                                        variant="body2"
                                    >
                                        {errors.channel[0]}
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
                                        if (value === 'keyword') {
                                            this.schema = {
                                                target_type: {
                                                    presence: { allowEmpty: false, message: 'is required' }
                                                },keyword : {
                                                    presence: { allowEmpty: false, message: 'is required' }
                                                }
                                            }
                                        }else if (value === 'video') {
                                            this.schema = {
                                                target_type: {
                                                    presence: { allowEmpty: false, message: 'is required' }
                                                },video : {
                                                    presence: { allowEmpty: false, message: 'is required' },
                                                    url: {
                                                        url:true,
                                                        message: 'is not valid'},
                                                }
                                            }
                                        } else {
                                            this.schema = {
                                                target_type: {
                                                    presence: { allowEmpty: false, message: 'is required' }
                                                },channel : {
                                                    presence: { allowEmpty: false, message: 'is required' },
                                                    url: {
                                                        url:true,
                                                        message: 'is not valid'},
                                                }
                                            }
                                        }
                                        handleFieldChange(this, 'target_type', value, this.schema)
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

