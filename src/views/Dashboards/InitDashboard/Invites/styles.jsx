export default theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    color: theme.palette.text.secondary,
    fontWeight: 700
  },
  value: {
    marginTop: theme.spacing.unit
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: '50%',
    display: 'inline-flex',
    height: '4rem',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '4rem'
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: '2rem',
    height: '2rem',
    width: '2rem'
  },
  footer: {
    marginTop: theme.spacing.unit * 2,
    display: 'inline-flex',
    alignItems: 'center'
  },
  difference: {
    alignItems: 'center',
    display: 'inline-flex',
    fontWeight: 700
  },
  caption: {
    marginLeft: theme.spacing.unit
  },
  newCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardActions: {
    squared: false,
    outlined: true,
    elevation: 1,
    borderRadius: '8px'
  }
});
