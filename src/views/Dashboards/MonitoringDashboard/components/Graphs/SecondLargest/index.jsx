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

import data from './data/second_largest_network_json.json';

const IMAGE_SIZE = 24;
const FORCE_LINK_DISTANCE = IMAGE_SIZE * 4;


class SecondLargest extends Component {

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

    const { classes, className,cloudOptions, Graph,...rest } = this.props;
    return (

      <div>
        <PortletHeader noDivider>
          <Typography variant="h2">Second Largest Network</Typography>
        </PortletHeader>


        <ForceGraph2D
          ref={el => this.fg = el}
          graphData={data}
          nodeColor="id"
          nodeLabel="name"
          linkDirectionalArrowLength={3.5}
          onNodeClick={(node, event) => {
            console.log(node);
            const { history } = this.props;
            history.push('/dashboard/project/analysis/profile_analysis', { type: 'INFO', target_type: 'USER' });
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

            //ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            //ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = node.node_color;
            ctx.fillText(label, node.x, node.y);
          }}
        />

      </div>

    );
  }


}


SecondLargest.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)
(SecondLargest);

