import React, { Component } from 'react';
import randomColor from 'randomcolor';
// Externals
import PropTypes from 'prop-types';



// Material helpers
import {
    Typography,
    withStyles
} from '@material-ui/core';


// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
    PortletContent
} from 'components';

// Component styles
import styles from './styles';

// Shared Resources
import compose from "recompose/compose";
import {withRouter} from "react-router-dom";

//network graph
import {ForceGraph3D,ForceGraph2D} from 'react-force-graph';
import data from './data/miserables.json';
import SpriteText from 'three-spritetext';

class ProfilesNetwork extends Component {

        state = {};

        render() {
            const {classes, className, cloudOptions, ...rest} = this.props;

            return (

                <Portlet>
                    <PortletHeader noDivider>
                        <Typography variant="h2">Network Of Hate Profiles</Typography>
                    </PortletHeader>
                    <PortletContent
                        noPadding
                    >
                        {/*<ForceGraph3D*/}
                        {/*    backgroundColor={"rgba(0,0,0,0)"}*/}
                        {/*    width='80%'*/}
                        {/*    graphData={data}*/}
                        {/*    linkDirectionalArrowLength={3.5}*/}
                        {/*    linkDirectionalArrowRelPos={1}*/}
                        {/*    linkCurvature={1}*/}
                        {/*    nodeAutoColorBy="group"*/}
                        {/*    linkAutoColorBy="group"*/}
                        {/*    linkWidth={2}*/}
                        {/*    nodeThreeObject={node => {*/}
                        {/*        const sprite = new SpriteText(node.id);*/}
                        {/*        sprite.color = node.color;*/}
                        {/*        sprite.textHeight = 8;*/}
                        {/*        return sprite;*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <ForceGraph2D
                            className={classes.body}
                            graphData={data}
                            nodeAutoColorBy="group"
                            linkDirectionalArrowLength={3.5}
                            linkDirectionalArrowRelPos={1}
                            nodeCanvasObject={(node, ctx, globalScale) => {
                                const label = node.id;
                                const fontSize = 12/globalScale;
                                ctx.font = `${fontSize}px Sans-Serif`;
                                const textWidth = ctx.measureText(label).width;
                                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
                                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillStyle = node.color;
                                ctx.fillText(label, node.x, node.y);
                            }}
                        />
                    </PortletContent>
                </Portlet>
            );
        }


    }


ProfilesNetwork.propTypes = {
        className: PropTypes.string,
        classes: PropTypes.object.isRequired
    };

export default compose(
    withRouter,
    withStyles(styles)
)
    (ProfilesNetwork);

