import React, {Component} from 'react';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
// Material helpers
import {
    CardActions,
    CircularProgress,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles
} from '@material-ui/core';
// Shared services
import {getProjects} from 'services/project';
import * as constants from 'constants/constants.js'
// Component styles
import styles from './styles';
import ProjectCard from "./ProjectCard";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import {connect} from "react-redux";

class Projects extends Component {

    signal = false;
    state = {
      isLoading: false,
      projects: []
    };

    async getProjects() {
        try {
            this.setState({isLoading: true});

            const {projects} = await getProjects(0);
            this.props.dispatch({
                type: constants.ADD_PROJECTS,
                projects
            });

            if (this.signal) {
                this.setState({
                    isLoading: false,
                    projects
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
        this.getProjects();
    }

    componentWillUnmount() {
        this.signal = false;
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props !== nextProps) {
            console.log('here');
            this.setState({
                projects: nextProps.projects
            });
            localStorage.setItem('projects', JSON.stringify(nextProps.projects));
        }
    }
    render() {
        const {classes, className, ...rest} = this.props;
        const rootClassName = classNames(classes.root, className);
        const {isLoading} = this.state;
        const showProjects = !isLoading && this.state.projects;

        return (
            <div className={rootClassName}>
                <div>
                    <div
                        className={classes.portletContent}
                    >
                        {isLoading && (
                            <div className={classes.progressWrapper}>
                                <CircularProgress/>
                            </div>
                        )}
                        {!isLoading && (
                            <Grid
                                container
                                spacing={4}
                            >
                                <Grid
                                    item
                                    lg={3}
                                    sm={4}
                                    xl={3}
                                    xs={6}
                                >
                                    <ProjectCard className={classes.newCard} isNewCard={true}/>
                                </Grid>

                                {showProjects && (
                                    this.state.projects.map(project => (
                                        <Grid
                                            item
                                            lg={3}
                                            sm={4}
                                            xl={3}
                                            xs={6}
                                        >
                                            <ProjectCard
                                                project={project}
                                                isNewCard={false}
                                            />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        )}
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        projects: state.projects
    }
};

Projects.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)
(withStyles(styles)
(Projects));
