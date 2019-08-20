import * as color from "common/colors";
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
}
});
