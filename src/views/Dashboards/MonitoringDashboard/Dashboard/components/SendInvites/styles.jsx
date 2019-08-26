export default theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  field: {
    display: 'flex',
    margin: theme.spacing.unit * 3,
  },
  textField: {
    width: '420px',
    maxWidth: '100%',
    marginRight: theme.spacing.unit * 3
  },
    selectField: {
  width: '210px',
  maxWidth: '100%',
  marginRight: theme.spacing.unit * 3
},
  portletFooter: {
  paddingLeft: theme.spacing.unit * 3,
  paddingRight: theme.spacing.unit * 3,
  paddingTop: theme.spacing.unit * 2,
  paddingBottom: theme.spacing.unit * 2
},
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  },
  fieldDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'baseline'
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: 'center',
    margin: theme.spacing.unit * 2
  },
});
