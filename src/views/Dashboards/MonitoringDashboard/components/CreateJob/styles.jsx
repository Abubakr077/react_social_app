export default theme => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  platformTwitter: {
    width: '20%'
  },
  platformFacebook: {
    width: '20%'
  },
  platformInsta: {
    width: '20%'
  },
  platformlinkedin: {
    width: '20%'
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
  },
  formControl: {
    margin: theme.spacing(3),
    width: '100%'
  },
  group: {
    margin: theme.spacing(1, 0),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    margin: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 12

  }
});
