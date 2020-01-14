import React, {Component} from 'react';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Material helpers
// Material components
import {Button, Card, CardActions, IconButton, withStyles} from '@material-ui/core';

import {Delete as DeleteIcon, ExitToAppOutlined as RemoveIcon,} from '@material-ui/icons';


import * as endPoints from 'constants/endpoints.json';
import * as constants from 'constants/constants.js';
import request from 'helpers/request.js';
import {toast} from 'react-toastify';
import {connect} from "react-redux";
import compose from "recompose/compose";
import {Message, optionsSuccess} from "constants/constants";
import {optionsError} from "../../../../../constants/constants";
import confirm from 'helpers/confirmation.js';
// Component styles
import styles from './styles';

class CustomCard extends Component {
    render() {
        const {
            classes,
            className,
            outlined,
            squared,
            children,
            newCard,
            cardProject,
            ...rest
        } = this.props;
        const rootClassName = classNames(
            {
                [classes.root]: true,
                [classes.squared]: squared,
                [classes.outlined]: outlined
            },
            className
        );


        const projectDetails = () => {
            localStorage.setItem('project', JSON.stringify(cardProject));
            localStorage.setItem('project_id', cardProject.project.id);
            this.props.history.push('/dashboard/project');
        };

        return (
            <Card
                {...rest}
                className={rootClassName}
            >
                <Button fullWidth={true}
                        className={newCard ? classes.newCardButton : classes.button}
                        onClick={!newCard ? projectDetails : null}
                >
                    {children}
                </Button>

                {!newCard && (
                    <div className={classes.actionDiv}>
                        < CardActions className={classes.cardActions}>
                            {cardProject.role !== 'OWNER' && (
                                <IconButton onClick={()=>{
                                    console.log(cardProject);
                                    confirm('Are you sure you want to remove project ' + cardProject.project.name + ' ?').then(
                                        (result) => {
                                            // `proceed` callback
                                            this.handleDelete(cardProject);
                                        },
                                        (result) => {
                                            // `cancel` callback
                                        }
                                    )
                                }}>
                                    <RemoveIcon/>
                                </IconButton>
                            )}
                            {cardProject.role === 'OWNER' && (
                                <IconButton onClick={()=>{
                                    confirm('Are you sure you want to delete project ' + cardProject.project.name + ' ?').then(
                                        (result) => {
                                            // `proceed` callback
                                            this.handleDelete(cardProject);
                                        },
                                        (result) => {
                                            // `cancel` callback
                                        }
                                    )
                                }}>
                                    <DeleteIcon className={classes.deleteIcon}/>
                                </IconButton>
                            )}
                        </CardActions>
                    </div>
                )}

            </Card>
        );


    }

    async handleDelete(cardProject) {
        const user = JSON.parse(localStorage.getItem('user'));
        const projects = JSON.parse(localStorage.getItem('projects'));
        const id = cardProject.project.id;
        try {
            await request({
                url: endPoints.deleteProject,
                method: 'DELETE',
                headers: {
                    user_id: user.id,
                    x_auth_token: user.x_auth_token.token,
                    project_id: id
                }
            }).then(() => {
                    this.props.dispatch({
                        type: constants.DELETE_PROJECT,
                        projects,
                        id
                    });
                    if (cardProject.role === 'OWNER') {
                        toast.success(<Message name={'Project Deleted Successfully'}/>, optionsSuccess);
                    } else {
                        toast.success(<Message name={'Project Removed Successfully'}/>, optionsSuccess);
                    }
                }
            );
        } catch (error) {
            toast.error(<Message name={error.data}/>, optionsError);
        }
    }
}

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
const mapStateToProps = (state, ownProps) => {
    return {
        projects: state.projects
    }
};
export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)
(CustomCard);
