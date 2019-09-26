import React, {Component} from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import {
    Grid,
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
    PortletFooter,
    PortletContent
} from 'components';
import ProfileBar from "../Grapths/ProfilesBar";
import ProfilesTable from "../Tables/ProfilesTable";




class ProfilesList extends Component {

    render() {

        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        const prevState = this.props.location.state;



        return (
            <DashboardLayout className={rootClassName}
                             title={ " PROFILES"}
                             initUser={false}
                             options={{
                                 isTweetsRoute: true
                             }}
            >
                <div className={classes.root}>
                    <Portlet >
                        <PortletHeader noDivider>
                            <Typography variant="h2"> Profiles</Typography>
                        </PortletHeader>
                        <PortletContent
                            noPadding
                        >
                            <Grid
                                item
                                xs={12}
                                className={classes.barGrapth}
                            >
                               <ProfileBar/>
                            </Grid>
                        </PortletContent>
                    </Portlet>
                    <Grid
                        item
                        xs={12}
                        className={classes.marginTable}
                    >
                        <ProfilesTable/>
                    </Grid>
                </div>
            </DashboardLayout>
        );
    }

    handleClick() {

    }
}

ProfilesList.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilesList);
