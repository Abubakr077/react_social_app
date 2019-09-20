export default theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%',
    width: '100%',
  },
  contentBody: {
    display: 'flex'
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
}
});
