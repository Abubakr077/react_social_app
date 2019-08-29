export default theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width:'100%'
    },
    input: {
        margin: theme.spacing(1),
      },
    dense: {
      marginTop: theme.spacing(1),
    },
    menu: {
      width: '100%',
    },
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
      },
  });