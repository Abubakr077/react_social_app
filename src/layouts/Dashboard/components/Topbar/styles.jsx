const drawerWidth = 240;
export default theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    // minHeight: 'auto',
    width: '100%'
  },
  title: {
    marginLeft: theme.spacing.unit,
    textTransform: 'capitalize',
    color: theme.palette.common.white
  },
  menuButton: {
    marginLeft: '-4px',
    color: theme.palette.common.white
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appName: {
    display: 'flex',
    flexDirection: 'row'
  },
  notificationsButton: {
    marginLeft: 'auto',
    color: theme.palette.common.white
  },
  projectName: {
    color: theme.palette.common.white
  },
  signOutButton: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.common.white
  },
  contextButton: {
    color: 'primary'
  },

  purpleAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.info.main,
    marginLeft: theme.spacing.unit

  }
});
