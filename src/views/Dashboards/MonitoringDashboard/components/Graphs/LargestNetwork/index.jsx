import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';
// Material helpers
import { Grid, Typography, withStyles } from '@material-ui/core';
// Shared components
import { PortletHeader } from 'components';
// Component styles
import styles from './styles';
// Shared Resources
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
//network graph
import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';
import data from './data/1.json';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
const IMAGE_SIZE = 24;
const FORCE_LINK_DISTANCE = IMAGE_SIZE * 4;

class LargestNetwork extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isRotationActive : true
    };
  }
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
    // this.fg.d3Force('charge').strength(-150);
    // this.fg.zoom(2);
    let angle = 0;
    const distance = 3050;
    this.setState({
      isRotationActive : true
    })

    setInterval(() => {
      if (this.state.isRotationActive) {
        if (this.fg !== null){
        this.fg.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle)
        });
        angle += Math.PI / 300;

      }
    }}, 10);

  }
  handleRotate(event){
    this.setState({
      isRotationActive : !this.state.isRotationActive
    })
    event.target.innerHTML = `${(this.state.isRotationActive ? 'Pause' : 'Resume')} Rotation`;
  }
  render() {
    const { classes, className,cloudOptions,Graph,...rest } = this.props;

    return (
      <Card>
        {/*Title Bar */}
        <AppBar position="static">
          <Toolbar  style={{display: 'flex'}}>
            <Typography  edge="start" className={classes.graphtitle1} color="inherit" aria-label="menu">
              Network Graph
            </Typography>
            <Button style={{ marginLeft: "auto" }} onClick={(event)=>this.handleRotate(event)}  variant="contained" color="primary">
              Pause Rotation
            </Button>
          </Toolbar>

        </AppBar>
        {/*3d Graph Start*/}
        <ForceGraph3D
          ref={el => this.fg = el}
          graphData={data}
          nodeColor="node_color"
          nodeLabel="name"
          nodeAutoColorBy = "user"
          // backgroundColor="#111111"
          linkAutoColorBy="node_color"
          // cameraPosition={({ x: distance })}
          linkDirectionalParticles={1}
          // showNavInfo={false}
          // enableNodeDrag={true}
          nodeRelSize={5}
          linkDirectionalParticle={1}
          linkDirectionalArrowLength={1}
          onNodeClick={(node, event) => {
            // // Aim at node from outside it
            // const distance = 140;
            // const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
            //
            // this.fg.cameraPosition(
            //   { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            //   node, // lookAt ({ x, y, z })
            //   3000  // ms transition duration
            // );
            console.log(node);
            const { history } = this.props;
            history.push('/dashboard/project/analysis/profile_analysis', { name: node.name, color: node.node_color,screen: node.name });
          }}

        />

      </Card>
    );
  }
}
LargestNetwork.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)
(LargestNetwork);

