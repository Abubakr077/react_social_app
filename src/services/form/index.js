import _ from "underscore";
import validate from "validate.js";

export const validateForm = _.debounce((thisObj,schema) => {
    const {values} = thisObj.state;

    const newState = {...thisObj.state};
    const errors = validate(values, schema);
    newState.errors = errors || {};
    newState.isValid = !errors;

    thisObj.setState(newState);
}, 300);

export const handleFieldChange = (thisObj,field, value,schema) => {
    const newState = {...thisObj.state};

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    thisObj.setState(newState, validateForm(thisObj,schema));
};