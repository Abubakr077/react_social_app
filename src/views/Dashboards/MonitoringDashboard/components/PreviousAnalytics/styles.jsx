import * as color from 'common/colors';

export default theme => ({
  root: {
    padding: theme.spacing(4)
  },
  portletContent: {
    minWidth: '300px'
  },
  progressWrapper: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  tableRow: {
    cursor: 'pointer'
  },
  textField: {
    display: 'flex',
    justifyContent: 'center',
    width: '320px',
    maxWidth: '100%',
    marginRight: theme.spacing(4)
  },
  portlet: {
    margin: theme.spacing(3)
  },
  title: {
    marginLeft: theme.spacing(2),
    textTransform: 'capitalize'
  },
  caption: {
    alignItems: 'center',
    marginLeft: 'auto',
    alignSelf: 'center'
  },
  fields: {
    display: 'flex'
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  deleteIcon: {
    color: color.red
  },
  blueIcon: {
    color: color.blue
  },
  greenIcon: {
    color: color.green
  },
  portletFooter: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    alignSelf: 'center'
  },
  user_name: {
    display: 'flex',
    alignItems: 'center'
  },
  bigAvatar: {
    marginLeft: 10,
    marginRight: 10,
    width: 60,
    height: 60
  },
  icon: {
    display: 'flex'
  },
  statusWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing.unit
  }
});
