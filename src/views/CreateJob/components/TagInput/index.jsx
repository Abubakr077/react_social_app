import React from 'react';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import './style.css'
import {
  withStyles
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import styles from './style';
class InputTag extends React.Component {
    constructor() {
      super();
       
      this.state = {
        tags: [
        ]
      };
    }
    
    removeTag = (i) => {
      const newTags = [ ...this.state.tags ];
      newTags.splice(i, 1);
      this.setState({ tags: newTags },() => this.props.getData(this.state));
      
    }
  
    inputKeyDown = (e) => {
      const val = e.target.value;
      if (e.key === 'Enter' && val) {
        if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
        this.setState({ 
          tags: [...this.state.tags, val]},() => this.props.getData(this.state));
        e.target.value = null;
      } else if (e.key === 'Backspace' && !val) {
        this.removeTag(this.state.tags.length - 1);
      }
      
    }
  
    render() {
      const { tags } = this.state;
      const { classes, className, ...rest } = this.props;
      return (
        <Paper className={classes.paper}>
          <ul className="input-tag__tags">
            { tags.map((tag, i) => (
              <li key={tag}>
                {tag}
                <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
              </li>
            ))}
          </ul>
          <TextField
            onKeyDown={this.inputKeyDown} 
        id="outlined-dense"
        label={this.props.label}
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
      />
        </Paper>
      );
    }
  }
  

  export default withStyles(styles) (InputTag)