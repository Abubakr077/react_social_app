export default theme => ({
  root: {
    width: '150px',
    maxWidth: '100%'
  },
  subtitle: {
    color: theme.palette.text.secondary
  },
  content: {},
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
  },
  listItemIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: '10px',
    borderRadius: '50%',
    marginRight: theme.spacing.unit * 2
  },
  listItemTextSecondary: {
    marignTop: '4px',
    color: theme.palette.text.secondary
  },
  arrowForward: {
    color: theme.palette.text.secondary,
    height: '16px',
    width: '16px'
  },
  footer: {
    paddingBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center'
  },
  empty: {
    textAlign: 'center',
    padding: theme.spacing.unit * 3
  },
  emptyImageWrapper: {
    marginBottom: theme.spacing.unit * 3
  },
  emptyImage: {
    width: '240px',
    maxWidth: '100%',
    height: 'auto'
  }
});
