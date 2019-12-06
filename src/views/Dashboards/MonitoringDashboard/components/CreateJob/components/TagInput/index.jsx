import React from 'react';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import {Paper as Paper1} from 'components';
import {
    withStyles
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import styles from './style';

class InputTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
    }

    removeTag = (i) => {
        console.log('in remove tag');
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.setState({tags: newTags}, () => this.props.getData(this.state));

    };

    inputKeyDown = (e) => {
        const val = e.target.value;
        if ((e.key === 'Enter' && val) || (e.key === ' ' && val) || (e.key === 'Tab' && val)) {
            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({
                tags: [...this.state.tags, val]
            }, () => this.props.getData(this.state));
            e.target.value = null;
        } else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
        }

    };

    render() {
        const {tags} = this.state;
        console.log('tags');
        console.log(tags);
        const {classes, className, ...rest} = this.props;
        return (
            <Paper1 outlined={false} className={classes.paper}>
                <div className={classes.input_tag__tags}>
                    {tags.map((tag, i) => (
                        <Chip className={classes.input_tag__tags_li}
                              key={tag} label={tag}
                              onDelete={()=>this.removeTag(i)}
                              color="primary" size="small"/>
                    ))}
                </div>
                <TextField
                    onKeyDown={this.inputKeyDown}

                    id="outlined-dense"
                    label={this.props.label}
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                    FormHelperTextProps={'press enter to add tag of '+this.props.label}
                />
            </Paper1>
        );
    }
}

export default withStyles(styles)(InputTag)