import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';

// Shared services
import { getTopProfiles } from 'services/user';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from 'components';

// Component styles
import styles from './styles';



class TopProfilesTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    type: this.props.type
  };

  async getTopProfiles(limit) {
    try {
      this.setState({ isLoading: true });

      const { users } = await getTopProfiles(limit);

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

    this.getTopProfiles(limit);
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
        <PerfectScrollbar>
          <PortletContent
            className={classes.portletContent}
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
                    <TableCell>{'Top ' +this.state.type+ ' Profiles'}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </PortletContent>
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

TopProfilesTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopProfilesTable);
