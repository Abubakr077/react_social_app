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
import { getTrends } from 'services/trend';

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
    trends: [],
    trendsTotal: 0
  };

  async getTrends(limit) {
    try {
      this.setState({ isLoading: true });

      const { trends, trendsTotal } = await getTrends(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          trends,
          trendsTotal
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

    this.getTrends(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, trends, trendsTotal } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showTrends = !isLoading && trends.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            // subtitle={`${trendsTotal} in total`}
            title="Currently monitoring trends"
          />
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent
            className={classes.portletContent}
            noPadding
          >
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
            {showTrends && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Trend ID</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trends.map(trend => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={trend.id}
                    >
                      <TableCell>{trend.id}</TableCell>
                      <TableCell>
                          {trend.status}
                      </TableCell>
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

TrendsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrendsTable);
