import React, {Component, useCallback, useState} from 'react';
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
// import data from './data/miserables.json';
import data from './data/WITTER_TREND_HATEPOOL_NETWORK_2019-10-30';



class ProfilesNetwork extends Component {

        state = {};



        render() {
            const {classes, className, cloudOptions, ...rest} = this.props;
            return (

                <div>
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
                            linkDirectionalParticles="value"
                            linkDirectionalParticleColor={() => 'blue'}
                            linkDirectionalParticleSpeed={d => d.value * 0.001}
                            onNodeDragEnd={node => {
                                node.fx = node.x;
                                node.fy = node.y;
                            }}
                            nodeCanvasObject={(node, ctx, globalScale) => {
                                const size = 12;
                                const label = node.id;
                                const fontSize = 12/globalScale;
                                // ctx.font = `${fontSize}px Sans-Serif`;
                                const textWidth = ctx.measureText(label).width;
                                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
                                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillStyle = node.color;
                                // ctx.img(new THREE.TextureLoader().load(`${node.img}`));
                                // ctx.drawImage(node.img, node.x - size / 2, node.y - size / 2, size, size);
                                ctx.fillText(label, node.x, node.y);
                            }}
                        />
                    </PortletContent>


                </Portlet>
                </div>

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

