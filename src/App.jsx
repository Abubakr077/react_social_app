import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer, Zoom } from 'react-toastify';
// Material helpers
import { ThemeProvider } from '@material-ui/styles';
// Theme
import theme from './theme';
// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';
// Routes
import Routes from './Routes';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Browser history
const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <PerfectScrollbar>
            <Router history={browserHistory}>
              <Routes/>
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
