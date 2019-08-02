export default theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  content: {
    alignItems: 'center',
    display: 'flex'
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
  cardActions: {
    squared: false,
    outlined: true,
    elevation: 1,
    borderRadius: '8px',
  },

  portletContent: {
    minWidth: '100px'
  },
  newCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column'
  },
  extendedIcon: {
    marginBottom: theme.spacing(1),
    width: 35,
    height: 35
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
  progressWrapper: {
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center'
  }  ,
  dialogueBody: {
    alignItems: 'center',
    maxWidth: 'lg',

  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing.unit * 2
    }
  },
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  },
  button: {
    minHeight: 200
  },
});
