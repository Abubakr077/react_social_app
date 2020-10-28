import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';
// Material helpers
import { Typography, withStyles } from '@material-ui/core';
// Shared components
import { PortletHeader } from 'components';
// Component styles
import styles from './styles';
// Shared Resources
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
//network graph
import { ForceGraph2D } from 'react-force-graph';
// import data from './data/miserables.json';
import data from './data/newdatal.json';
//import data from './data/WITTER_TREND_HATEPOOL_NETWORK_2019-10-30';
import ForceGraph3D from '3d-force-graph';
const IMAGE_SIZE = 24;
const FORCE_LINK_DISTANCE = IMAGE_SIZE * 4;


class ProfilesNetwork extends Component {

  state = {};
  _paintNode = (node, ctx) => {
    const { classes } = this.props;
    let image = new Image();
    image.src = node.img;
    image.className = classes.imageBody;
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

    const { classes, className, name,cloudOptions, Graph,...rest } = this.props;
    return (

      <div >
        <PortletHeader noDivider>
          <Typography variant="h2">Network Of Hate Profiles {name}</Typography>
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
          nodeColor="node_color"
          backgroundColor="#FFFFFF"
          linkDirectionalArrowLength={3}
          //linkAutoColorBy="name"
          linkDirectionalParticles={1}
          nodeRelSize={5}
          //nodeAutoColorBy="node_color"
          nodeLabel="name"
          linkColor="#F8FAFC"
          linkDirectionalParticle={1}

          //onNodeHover={node => elem.style.cursor = node ? 'pointer' : null}
          onNodeClick={(node, event) => {
            console.log('node: ',node);
            const { history } = this.props;
            history.push('/dashboard/project/analysis/profile_analysis/', { name: node.name, color: node.node_color });
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

