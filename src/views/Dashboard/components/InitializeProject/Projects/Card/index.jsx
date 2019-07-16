import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import {CardActions, withStyles} from '@material-ui/core';

// Material components
import {
  Card ,
  CardContent
}from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {white} from "../../../../../../common/colors";

let isNewCard;
// Component styles
const styles = theme => {
  return {
    root: {
      cursor: 'pointer',
      borderRadius: '8px',
      minHeight: 140
    }
    ,
    squared: {
      borderRadius: '10px'
    },
    outlined: {
      border: `1px  ${theme.palette.border}`
    },
    button: {
      minHeight: 140
    },
    customIcon: {
      color: 'white',
      hover: false
    },
    cardActions: {
      marginLeft: 'auto'
    }
  };
};

const CustomCard = props => {
  const { classes, className, outlined, squared, children,newCard, ...rest } = props;


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
        <Button fullWidth={true} className={classes.button}>
        {children}
        </Button>
        {!newCard && (
            < CardActions>
              <div className={classes.cardActions}>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              </div>
            </CardActions>
        )}
        {newCard && (
            < CardActions >
              <IconButton  disableRipple={false} aria-label="Share">
                <ShareIcon className={classes.customIcon} />
              </IconButton>

            </CardActions>
        )}
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
