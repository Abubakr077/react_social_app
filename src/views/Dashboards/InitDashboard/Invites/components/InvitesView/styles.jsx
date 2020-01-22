export default theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    padding: theme.spacing(3)
  },
  content: {},
  caption: {
    marginBottom: theme.spacing(1)
  },
  extendedIcon: {
    marginBottom: theme.spacing(1),
    width: 35,
    height: 35
  },
  card: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: theme.palette.primary.main,
        marginLeft: '-4px'
      }
    }
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
  },
  progressWrapper: {
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center'
  }
});
