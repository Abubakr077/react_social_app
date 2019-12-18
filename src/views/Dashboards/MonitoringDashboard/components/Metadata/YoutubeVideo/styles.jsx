export default theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  info: {},
  followers: {
    marginLeft: theme.spacing(4),
  },
  viewsBody: {
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing.unit
  },
  locationText: {
    marginTop: theme.spacing.unit,
    color: theme.palette.text.secondary,
    alignSelf: 'center'
  },
  username: {
  marginTop: theme.spacing.unit,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing.unit,
},

  followerHead: {
    marginTop: theme.spacing.unit,
  },
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
  icon: {
    marginTop: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  progressWrapper: {
    marginTop: theme.spacing.unit * 2
  },
  uploadButton: {
    marginRight: theme.spacing.unit * 2
  }
});
