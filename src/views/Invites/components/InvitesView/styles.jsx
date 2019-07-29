export default theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing(3)
  },
  content: {
  },
  caption: {
    marginBottom: theme.spacing(1)
  },
  extendedIcon: {
    marginBottom: theme.spacing(1),
    width: 35,
    height: 35
  },
  newCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column'
  },
  title: {
    marginBottom: theme.spacing(1.5)
  },
  details: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'column'
  },
  button: {
    minHeight: 200
  },
  portletContent: {
    minWidth: '100px'
  },
  statusWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing.unit
  }
});
