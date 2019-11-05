export default theme => ({
    error:{
      color: theme.palette.danger.main,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },

    paper2: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    mapHeight: {
        height: '50%',
        padding: theme.spacing(4)
    },
    half: {
        width: '50%',
        marginLeft: theme.spacing(3),
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
        marginRight: theme.spacing(3),
    },

    spaceRight:{
        marginRight: theme.spacing(3),
    },
    signInButton:{
      textAlign:"center",
      marginTop: theme.spacing(0.6),
      marginBottom: theme.spacing(0.6),
      width:"100%"
    },
    flexGrid: {
        display: 'flex',
        width:'100%'
    }
  });