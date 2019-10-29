export default theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%',
    width: '100%',
  },
  contentBody: {
    display: 'flex',
  },
  lineBody: {
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    height: '300px',
    width: '70%',
  },
  pieBody: {
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    height: '300px',
    width: '30%',
  },
  areaBody: {
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    height: '300px',
    width: '100%',
  }
  ,cloudBody:{
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    height: '300px',
    width: '100%',
  },
  cloudBody2:{
    webkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    height: '600px',
    width: '100%',
  },
  details: {
    display: 'flex'
  },
  info: {},
  locationText: {
    marginTop: theme.spacing.unit,
    color: theme.palette.text.secondary
  }
  ,
  dateText: {
    color: theme.palette.text.secondary
  },
  avatar: {
    marginLeft: 'auto',
    height: '110px',
    width: '110px',
    flexShrink: 0,
    flexGrow: 0
  },
    progressWrapper: {
  padding: theme.spacing.unit,
  display: 'flex',
  justifyContent: 'center'
}, newEntryButton: {
    marginLeft: theme.spacing.unit
  }
});
