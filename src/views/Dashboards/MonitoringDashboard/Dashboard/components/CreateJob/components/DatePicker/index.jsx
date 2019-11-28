import React, {Component, useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from 'moment'
class DatePickerInline extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    selectedDate : new Date()
  }
  handleDateChange(date){
    this.setState({
      selectedDate:date
    });
    var dateString = moment(date).format('YYYY-MM-DD');
    this.props.getDate(dateString)
  }
  render() {
    
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        margin="dense"
        variant="inline"
        inputVariant="outlined"
        label={this.props.label}
        format="MM/dd/yyyy"
        value={this.state.selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => this.handleDateChange(date)}
      />
    </MuiPickersUtilsProvider>
    );
  }
}

export default (DatePickerInline)