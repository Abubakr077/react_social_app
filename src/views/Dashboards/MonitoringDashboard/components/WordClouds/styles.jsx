export default theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  app_outer: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    width: '100%',
    minWidth: '1000px'
  },
  app_inner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100px',
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box'
  }

});
