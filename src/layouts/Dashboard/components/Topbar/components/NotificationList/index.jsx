import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// Material icons
import {
  ArrowForwardIos as ArrowForwardIosIcon,
  Payment as PaymentIcon,
  PeopleOutlined as PeopleIcon,
  Code as CodeIcon,
  Store as StoreIcon
} from '@material-ui/icons';
import { InsertChartOutlined as InsertChartIcon } from '@material-ui/icons';
import {getPreviousMonitorTasks} from 'services/monitoringJob';

// Component styles
import styles from './styles';
import LinearProgress from "@material-ui/core/LinearProgress";
import compose from "recompose/compose";
import {connect} from "react-redux";
const icons = {
  order: {
    icon: <PaymentIcon />,
    color: 'blue'
  },
  user: {
    icon: <PeopleIcon />,
    color: 'red'
  },
  product: {
    icon: <StoreIcon />,
    color: 'green'
  },
  feature: {
    icon: <CodeIcon />,
    color: 'purple'
  },
  analyticalTask: {
    icon: <InsertChartIcon />,
    color: 'blue'
  },
};

class NotificationList extends Component {
  state = {
    JobTaskId: null,
    jobTasks: []
  };

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.project_id = localStorage.getItem('project_id');

    if (this.props.JobTaskId){
      getPreviousMonitorTasks(this,this.props.JobTaskId);
      console.log('here');
      console.log(this.props.JobTaskId);
      console.log(this.state.jobTasks)
    }
  }
  render() {
    const { className, classes, notifications, onSelect } = this.props;

    const rootClassName = classNames(classes.root, className);
    const {jobTasks} = this.state;

    return (
      <div className={rootClassName}>
        {jobTasks.length > 0 ? (
          <Fragment>
            <div className={classes.header}>
              <Typography variant="h6">Notifications</Typography>
              <Typography
                className={classes.subtitle}
                variant="body2"
              >
                {jobTasks.length} new notifications
              </Typography>
            </div>
            <div className={classes.content}>
              <List component="div">
                {notifications.map(notification => (
                  <Link
                    key={notification.id}
                    to="#"
                  >
                    <ListItem
                      className={classes.listItem}
                      component="div"
                      onClick={onSelect}
                    >
                      <ListItemIcon
                        className={classes.listItemIcon}
                        style={{ color: 'blue' }}
                      >
                        <InsertChartIcon/>
                      </ListItemIcon>
                      <ListItemText
                        classes={{ secondary: classes.listItemTextSecondary }}
                        primary={notification.title}
                        secondary={notification.when + this.state.JobTaskStatus}
                      />
                      <ArrowForwardIosIcon className={classes.arrowForward} />
                    </ListItem>
                    <LinearProgress
                    />
                    <Divider />
                  </Link>
                ))}
              </List>
              {/*<div className={classes.footer}>*/}
              {/*  <Button*/}
              {/*    color="primary"*/}
              {/*    component={Link}*/}
              {/*    size="small"*/}
              {/*    to="#"*/}
              {/*    variant="contained"*/}
              {/*  >*/}
              {/*    See all*/}
              {/*  </Button>*/}
              {/*</div>*/}
            </div>
          </Fragment>
        ) : (
          <div className={classes.empty}>
            <div className={classes.emptyImageWrapper}>
              <img
                alt="Empty list"
                className={classes.emptyImage}
                src="/images/empty.png"
              />
            </div>
            <Typography variant="h4">There's nothing here...</Typography>
          </div>
        )}
      </div>
    );
  }
}

NotificationList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

NotificationList.defaultProps = {
  notifications: [],
  onSelect: () => {}
};

const mapStateToProps = (state, ownProps) => {
  return {
    JobTaskId: state.JobTaskId,

  }
};
export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(NotificationList);
