import React, {Component} from 'react';
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
import PNTweetsPie from "../Graphs/PNTweetsPie";
import {handleFieldChange} from 'services/form';
import schema from "./schema";
import {toast} from "react-toastify";
import {Message, optionsError, optionsSuccess} from "../../../../../../constants/constants";
import * as endpoints from 'constants/endpoints.json';
import request from 'helpers/request.js';



class CompareWNews extends Component {


    state = {
        isLoading: false,
        isValid: false,
        results: [],
        submitError: false,
        serviceError: null,
        values: {
            link: '',
        },
        touched: {
            link: false,
        },
        errors: {
            link: null
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
            <DashboardLayout className={rootClassName}
                             title={ " Compare"}
                             initUser={false}
                             options={{
                                 isTweetsRoute: true
                             }}
            >
                <div className={classes.root}>
                    <Portlet >
                        <PortletHeader noDivider>
                            <PortletLabel
                                title="Search Article"
                                subtitle="Provide link to compare"
                            />
                        </PortletHeader>
                        <PortletContent
                            noPadding
                        >
                            <div className={classes.field}>
                                <div className={classes.fieldDiv}>
                                <TextField
                                        className={classes.textField}
                                        label="Link"
                                        margin="dense"
                                        name="link"
                                        onChange={event =>
                                            handleFieldChange(this,'link', event.target.value,schema)
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
                                <div className={classes.button}>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={()=>this.handleSendLink()}
                                            disabled={!isValid}
                                        >
                                            Compare
                                        </Button>
                                    {isLoading && (<CircularProgress size={30}  className={classes.loading}/>) }
                                </div>
                            </div>
                        </PortletContent>
                    </Portlet>
                    <Portlet>
                        <PortletHeader noDivider>
                            <PortletLabel
                                title="Results"
                            />
                        </PortletHeader>
                        <PortletContent
                            className={classes.contentBody}
                            noPadding
                        >
                             { <div className={classes.pieBody}>
                                 <PNTweetsPie data={this.prevState.polarity_dist} type={this.prevState.type} target_type={this.prevState.target_type}/>
                            </div>}
                            <div className={classes.pieBody}>
                                <PNTweetsPie data={this.state.results} type={this.prevState.type} target_type={this.prevState.target_type}/>
                            </div>
                        </PortletContent>
                    </Portlet>
                </div>
            </DashboardLayout>
        );
    }

    async handleSendLink() {
        this.setState({
            isLoading: true,
            isValid: false,
            results: this.prevState.polarity_dist
        });
        const {values} = this.state;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.project_id = localStorage.getItem('project_id');
        try {
            await request({
                url: endpoints.compareTrendWNews,
                method: 'GET',
                headers: {
                    user_id: this.user.id,
                    x_auth_token: this.user.x_auth_token.token,
                    project_id: this.project_id
                },
                params: {
                    news_url : values.link
                }
            }).then((res) => {
                    console.log(res);
                    this.setState({
                        results: res.results
                    })
                }
            );
        } catch (error) {
            toast.error(<Message name={error.data}/>, optionsError);
            this.setState({
                isLoading: false,
                isValid: true
            });
        }


    }
}

CompareWNews.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CompareWNews);
