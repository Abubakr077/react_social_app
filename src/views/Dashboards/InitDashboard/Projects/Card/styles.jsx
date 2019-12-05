export default theme => ({
  root: {
    cursor: 'pointer',
    borderRadius: '8px',
    minHeight: 140
  }
  ,
  squared: {
    borderRadius: '10px'
  },
  outlined: {
    border: `1px  ${theme.palette.border}`
  },
  button: {
    minHeight: 140
  },
  newCardButton: {
    minHeight: 200
  },
  customIcon: {
    color: theme.palette.common.white,
    hover: false
  },
  cardActions: {
    right: 'auto',
    float: 'right'
  },
  actionDiv: {
    width: '100%'
  },
  deleteIcon: {
    color: theme.palette.danger.main
  }
});
