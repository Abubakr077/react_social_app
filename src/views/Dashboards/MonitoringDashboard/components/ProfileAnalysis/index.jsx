import React, { Component } from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import { Avatar, Box, Button, CardActions, CardHeader, Divider, Grid, TextField, withStyles } from '@material-ui/core';

import { Dashboard as DashboardLayout } from 'layouts';
// Component styles
import styles from './styles';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import moment from 'moment';


const user = {
  avatar: 'public/images/logos/logoNCCS.png',
  array: ['jawad','ja','ka'],
  city: 'ISLAMABAD ',
  country: 'PAKISTAN',
  jobTitle: 'NCCS',
  name: 'User Details',
  timezone: 'GTM-7'
};
class ProfileAnalysis extends Component {

  render() {
    const { classes, className, ...rest } = this.props;
    this.prevState = this.props.location.state;
    const rootClassName = classNames(classes.root, className);
    // Graph Testing

    return (

      <DashboardLayout className={rootClassName}

                       title={"Profile Analysis of: "+this.prevState.name}
                       initUser={false}>
        <div className={classes.root}>
            <Grid
              container
              spacing={3}
            >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >

              <Card>
                <CardContent  style={{  border: '3px solid this.prevState.color' }}>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Avatar
                      className={classes.avatar}

                      src={this.prevState.avatar}
                    />
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h3"

                    >

                      {/*{this.prevState.title}*/}
                      {this.prevState.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      {user.city}

                    </Typography>
                    <Typography
                      className={classes.dateText}
                      color="textSecondary"
                      variant="body1"
                    >
                      {`${moment().format('hh:mm A')} ${user.timezone}`}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
              </Card>

            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >

              <form
                autoComplete="off"
                noValidate
              >
                <Card>
                  <CardHeader
                    //subheader="The information can be edited"
                    title="Contact Info"
                  />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField

                          fullWidth
                          helperText="Please specify the first name"
                          label="Full name"
                          name="firstName"

                          required
                          InputProps={{
                            readOnly: true,
                          }}
                           value={this.prevState.screen}

                          variant="outlined"
                        />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"

                          required
                          InputProps={{
                            readOnly: true,
                          }}
                          value={this.prevState.name+"@gmail.com"}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth

                          label="Phone Number"
                          name="phone"

                          type="number"
                          InputProps={{
                            readOnly: true,
                          }}
                          // value={values.phone}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Country"
                          name="country"

                          required
                          // value={values.country}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >

                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />

                </Card>
              </form>

              </Grid>
            </Grid>
            {/* <ProfilesNetwork /> */}
        </div>
      </DashboardLayout>
    );
  }
}

ProfileAnalysis.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileAnalysis);

