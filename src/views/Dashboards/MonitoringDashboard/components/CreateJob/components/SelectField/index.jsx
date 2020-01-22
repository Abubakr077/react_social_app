import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    width: '100%'
  },
  dense: {
    marginTop: theme.spacing(1)
  },
  menu: {
    width: 400
  }
}));


export default function OutlinedTextFields({ getValue, options, label, disabled, value }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({});


  const handleChange = name => event => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
    getValue(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-select-currency"
        select
        disabled={(disabled) ? 'disabled' : ''}
        label={label}
        className={classes.textField}
        // value={(disabled)?"Posts":values.currency}
        value={value}
        onChange={handleChange('currency')}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
        variant="outlined"
        margin="dense"
      >
        {options.map(option => (
          <MenuItem key={option.code} value={option.code}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
}
