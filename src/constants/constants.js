import {toast} from "react-toastify";
import React from "react";

export const Message = ({ name }) => <div>{name}</div>;
export const optionsError = {
    onOpen: props => console.log("opened"),
    onClose: props => console.log("closed"),
    autoClose: 6000,
    type: toast.TYPE.ERROR,
    hideProgressBar: true,
};
export const optionsSuccess = {
    onOpen: props => console.log("opened"),
    onClose: props => console.log("closed"),
    autoClose: 6000,
    type: toast.TYPE.SUCCESS,
    hideProgressBar: true,
};

// redux actions

export const ADD_USER = 'ADD_USER';
