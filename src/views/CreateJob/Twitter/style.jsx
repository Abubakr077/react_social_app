export default theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      
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

    space:{
      marginBottom: theme.spacing(3),
    },
    signInButton:{
      textAlign:"center",
      width:"100%"
    }
  });