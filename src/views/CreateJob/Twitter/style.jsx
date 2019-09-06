export default theme => ({
    error:{
      "color":"red",
      marginTop: theme.spacing(1),
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      
    },
    textField: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
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