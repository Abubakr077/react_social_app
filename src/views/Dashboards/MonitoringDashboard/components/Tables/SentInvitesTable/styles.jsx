import * as color from 'common/colors';

export default theme => ({
  root: {},
  portletContent: {
    minWidth: '300px'
  },
  progressWrapper: {
    padding: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center'
  },
  tableRow: {
    cursor: 'pointer'
  },
  deleteButton: {
    color: color.red,
  }
});
