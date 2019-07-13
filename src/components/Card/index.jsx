import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Card ,
  CardContent
}from "@material-ui/core";

// Component styles
const styles = theme => {
  return {
    root: {
      borderRadius: '8px'
    },
    squared: {
      borderRadius: '10px'
    },
    outlined: {
      border: `1px  ${theme.palette.border}`
    }
  };
};

const CustomCard = props => {
  const { classes, className, outlined, squared, children, ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.squared]: squared,
      [classes.outlined]: outlined
    },
    className
  );

  return (
    <Card
      {...rest}
      className={rootClassName}
    >
      <CardContent>
      {children}
      </CardContent>
    </Card>
  );
};

CustomCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  elevation: PropTypes.number,
  outlined: PropTypes.bool,
  squared: PropTypes.bool
};

CustomCard.defaultProps = {
  squared: false,
  outlined: true,
  elevation: 1
};

export default withStyles(styles)(CustomCard);
