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
import {select} from "d3-selection";

//network graph
import {ForceGraph3D,ForceGraph2D} from 'react-force-graph';
// import data from './data/miserables.json';
import data from './data/WITTER_TREND_HATEPOOL_NETWORK_2019-10-30';
const IMAGE_SIZE = 24;
const FORCE_LINK_DISTANCE = IMAGE_SIZE * 4;


class ProfilesNetwork extends Component {

        state = {};
    _paintNode = (node, ctx) => {
        const {classes} = this.props;
        let image = new Image();
        image.src = node.img;
        image.className= classes.imageBody;
        ctx.drawImage(image,
            node.x - IMAGE_SIZE / 2,
            node.y - IMAGE_SIZE / 2,
            IMAGE_SIZE,
            IMAGE_SIZE);
    };


    componentDidMount() {
        this.fg.d3Force('charge').strength(-150);
        this.fg.zoom(2);
    }

        render() {
            const {classes, className, cloudOptions, ...rest} = this.props;
            return (

                <div>
                    <PortletHeader noDivider>
                        <Typography variant="h2">Network Of Hate Profiles</Typography>
                    </PortletHeader>

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
                            ref={el => this.fg = el}
                            graphData={data}
                            nodeAutoColorBy="group"
                            nodeVal={IMAGE_SIZE}
                            linkDirectionalArrowLength={3.5}
                            linkDirectionalArrowRelPos={1}
                            linkDirectionalParticles="value"
                            // linkDirectionalParticleColor={() => 'blue'}
                            linkAutoColorBy="group"
                            linkDirectionalParticleSpeed={d => d.value * 0.002}
                            nodeLabel="id"
                            onNodeDragEnd={node => {
                                node.fx = node.x;
                                node.fy = node.y;
                            }}
                            onNodeClick={(node,event) => {
                                console.log(node);
                                const { history } = this.props;
                                history.push('/dashboard/project/analysis',{type: 'INFO' , target_type: 'USER'});
                            }}
                            nodeCanvasObject={(node, ctx, globalScale) => {
                                const fontSize = 12/globalScale;
                                // ctx.font = `${fontSize}px Sans-Serif`;

                                const imageWidth = ctx.measureText(node.img/12).width;
                                const bckgDimensions = [imageWidth, fontSize].map(n => n + fontSize*3); // some padding
                                ctx.fillStyle = node.color;
                                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillStyle = node.color;
                                // ctx.fillText(label, node.x, node.y);
                                this._paintNode(node,ctx);
                            }}
                        />
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

