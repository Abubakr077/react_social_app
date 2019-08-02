import React, {Component} from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {withStyles} from '@material-ui/core';


// Shared layouts
import {
  Dashboard as DashboardLayout

} from 'layouts';

// Custom components
import {
  Projects
} from './components';


import {connect} from 'react-redux';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  }
});

class Dashboard extends Component {

    constructor(props) {
      super(props);
    }

    render() {

      const {classes} = this.props;
        return (
          <DashboardLayout
            initUser
            title="Please Select Project"
          >
            <div className={classes.root}>
              { <Projects />                         }
            </div>
          </DashboardLayout>
        );
      }

}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    authenticate: state.authenticate,

  }
};
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default
connect(mapStateToProps)
(withStyles(styles)
(Dashboard));
