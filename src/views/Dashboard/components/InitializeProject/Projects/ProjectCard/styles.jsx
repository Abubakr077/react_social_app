export default theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'column'
  },
  content: {
  },
  caption: {
    marginLeft: theme.spacing.unit
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
    marginBottom: theme.spacing.unit * 1.5
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
  }
});
