export default theme => ({
  root: {
    padding: theme.spacing.unit * 4,
  },
  large: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  },
  app_outer: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    width: '100%',
    minWidth: '1000px',
    height: '400px',
},
app_inner: {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100px'
},

});
