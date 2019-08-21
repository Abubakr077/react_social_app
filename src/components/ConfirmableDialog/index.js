import React from 'react';
import PropTypes from 'prop-types';
import {confirmable} from 'react-confirm';
import Dialog from '@material-ui/core/Dialog'; // your choice.
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from "@material-ui/core/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmAbleDialog = ({show, proceed, dismiss, cancel, confirmation, options}) => {
    return (
        <Dialog
            onClose={dismiss}
            open={show}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Confirmation"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {confirmation}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
            <Button color={"primary"} onClick={() => cancel('arguments will be passed to the callback')}>CANCEL</Button>
            <Button color={"primary"} onClick={() => proceed('same as cancel')}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmAbleDialog.propTypes = {
    show: PropTypes.bool,
    proceed: PropTypes.func,
    cancel: PropTypes.func,
    dismiss: PropTypes.func,
    confirmation: PropTypes.string,
    options: PropTypes.object
}

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default confirmable(ConfirmAbleDialog);