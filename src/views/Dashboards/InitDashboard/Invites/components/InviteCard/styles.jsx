export default theme => ({
  root: {
    borderRadius: '8px',
    minHeight: 198,
    maxHeight: 198,
    minWidth: 276,
    maxWidth: 276,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginRight: '300px'
  }
  ,
  squared: {
    borderRadius: '10px'
  },
  outlined: {
    border: `1px  ${theme.palette.border}`
  },
  cardActions: {
    marginLeft: 'auto',
    marginTop: theme.spacing(1)
  },
  acceptButton: {
    color: theme.palette.success.main,
    width: 25,
    height: 25
  },
  cancelButton: {
    color: theme.palette.danger.main,
    width: 25,
    height: 25
  }
});
