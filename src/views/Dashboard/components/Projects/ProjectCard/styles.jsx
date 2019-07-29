export default theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'column'
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
  progressWrapper: {
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center'
  }  ,
  dialogueBody: {
    alignItems: 'center',
    maxWidth: 'lg',

  },

});
