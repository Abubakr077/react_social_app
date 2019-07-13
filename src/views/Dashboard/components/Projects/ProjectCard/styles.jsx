export default theme => ({
  root: {
    cursor: 'pointer',
    minHeight: 200
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: 'primary',
    fontWeight: 700
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
  extendedIcon: {
    marginBottom: theme.spacing(2),
  },
  newCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column'
  }
});
