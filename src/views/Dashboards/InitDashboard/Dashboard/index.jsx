import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Externals
import PropTypes from 'prop-types';

// Material helpers
import {withStyles} from '@material-ui/core';


// Shared layouts
import {
  Dashboard as DashboardLayout

} from 'layouts';
import {connect} from 'react-redux';

// Custom components
import asyncComponent from "components/AsyncComponent";
const Projects = asyncComponent(() =>
    import('./Projects').then(module => module.default)
);
const Invites = asyncComponent(() =>
    import('../Invites').then(module => module.default)
);



// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
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
      const url = this.props.match.url;
      // console.log(this.props.match.path);
      // console.log(url+'/invites');
        return (
          <DashboardLayout
            initUser
            title="Please Select Project"
          >
            <div className={classes.root}>
              <Projects/>
              {/*<Link to={`${this.props.match.url}/invites`}>Invites</Link>*/}
              {/*<Route path={url} component={Projects} />*/}
              {/*/!*<Route path={`${this.props.match.path}/invites`} component={Invites} />*!/*/}
              {/*<Route*/}
              {/*    path={`${this.props.match.path}/invites`}*/}
              {/*    render={*/}
              {/*        (<Invites/>)*/}
              {/*    }*/}
              {/*/>*/}
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

