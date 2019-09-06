import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer, Slide, Zoom, Flip, Bounce  } from 'react-toastify';

// Externals
// import { Chart } from 'react-chartjs-2';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// ChartJS helpers
import { chartjs } from './helpers';

// Theme
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import 'react-toastify/dist/ReactToastify.min.css'

// Routes
import Routes from './Routes';
import PerfectScrollbar from "react-perfect-scrollbar";

// Browser history
const browserHistory = createBrowserHistory();

// // Configure ChartJS
// Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
//   draw: chartjs.draw
// });

export default class App extends Component {
  render() {
    return (
        <div>
      <ThemeProvider theme={theme}>
        <PerfectScrollbar>
        <Router history={browserHistory}>
          <Routes />
        </Router>
        </PerfectScrollbar>
      </ThemeProvider>
            <ToastContainer
                transition={Zoom}
            />
        </div>
    );
  }
}
