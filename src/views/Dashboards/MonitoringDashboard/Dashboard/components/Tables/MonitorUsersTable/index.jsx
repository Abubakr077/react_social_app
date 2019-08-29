import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';


// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

// Shared services
import { getMonitorUsers } from 'services/user';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from 'components';

// Component styles
import styles from './styles';



class TrendsTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    users: []
  };

  async getMonitorUsers(limit) {
    try {
      this.setState({ isLoading: true });

      const { users } = await getMonitorUsers(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          users
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getMonitorUsers(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, users } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showUsers = !isLoading && users.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            title="Currently monitoring users"
          />
        </PortletHeader>
          <PortletContent
            className={classes.portletContent}
            noPadding
          >
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
            {showUsers && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell >Start Date</TableCell>
                    <TableCell>Platform</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                    >
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        {moment(user.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {user.platform}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </PortletContent>
      </Portlet>
    );
  }
}

TrendsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrendsTable);
