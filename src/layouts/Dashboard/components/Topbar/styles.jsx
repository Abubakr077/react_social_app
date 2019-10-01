import randomColor from 'randomcolor';
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
    minHeight: 'auto',
    width: '100%'
  },
  title: {
    marginLeft: theme.spacing.unit,
    textTransform: 'capitalize'
  },
  menuButton: {
    marginLeft: '-4px'
  },
  notificationsButton: {
    marginLeft: 'auto'
  },
  signOutButton: {
    marginLeft: theme.spacing.unit
  },
  contextButton: {
    color: "primary"
  },
  purpleAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.info.main,
    marginLeft: theme.spacing.unit

  },
});
