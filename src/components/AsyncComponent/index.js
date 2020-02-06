import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
export default function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    static Component = null;
    state = {
      Component: AsyncComponent.Component
    };

    componentWillMount() {

      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return <Typography
        variant="h6"
             >
        Loading ...
      </Typography>;
    }
  }

  return AsyncComponent;
}
