import * as color from "common/colors";
import { green } from '@material-ui/core/colors';
export default theme => ({
  root: {},
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
    marginRight: theme.spacing(4),
  },
  portlet:{
    margin: theme.spacing(3),
    // backgroundColor: theme.palette.background.default,
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
    display: 'flex',
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
    color: theme.palette.info.main
  },
  yellowIcon: {
    color: theme.palette.warning.main
  },
  greenIcon: {
    color: theme.palette.success.main
  },
  viewPrevious: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.warning.main,
    color: color.white
  },
  portletFooter: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    alignSelf: 'center'

  },
  wrapper: {
    margin: theme.spacing(1),
    display: 'flex'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
  color: green[500],
    alignItems: 'center',
    verticalAlign: 'middle',

},
  analyticsButton:{
  alignItems: 'center',
  }
});
