export default theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  details1: {
  display: 'flex'
},
  listItem: {
    width: '100%',
    backgroundColor: theme.palette.background.default
  },
  inline: {
    display: 'inline'
  },
  inlineText: {
    display: 'flex',
    alignItems: 'center'

  },
  actions: {
    display: 'flex',
    marginTop: theme.spacing(2)
  },
  text: {
    marginLeft: theme.spacing.unit
  },
  acceptButton: {
    color: theme.palette.success.main
  },
  cancelButton: {
    color: theme.palette.danger.main
  },
  marginLeft: {
    marginLeft: theme.spacing(3)
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    maxWidth: 320
  },
  bigAvatar: {
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    height: 100
  },
  filterBody: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  header: {
    textTransform: 'capitalize'
  },
  progressWrapper: {
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center'
  },
  info: {},
  followers: {
    marginLeft: theme.spacing(4)
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
    marginLeft: theme.spacing.unit
  },

  followerHead: {
    marginTop: theme.spacing.unit
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
  uploadButton: {
    marginRight: theme.spacing.unit * 2
  }
});
