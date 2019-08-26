import {toast} from "react-toastify";
import React from "react";

export const statusColors = {
    DELIVERED: 'success',
    PENDING: 'info',
    REFUND: 'danger',
    delivered: 'success',
    pending: 'info',
    refund: 'danger',
};

export const Message = ({ name }) => <div>{name}</div>;
export const optionsError = {
    onOpen: props => console.log("opened"),
    onClose: props => console.log("closed"),
    autoClose: 2000,
    type: toast.TYPE.ERROR,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: false
};
export const optionsSuccess = {
    onOpen: props => console.log("opened"),
    onClose: props => console.log("closed"),
    autoClose: 2000,
    type: toast.TYPE.SUCCESS,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: false
};


// redux actions

export const ADD_USER = 'ADD_USER';
export const ADD_PROJECTS = 'ADD_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DELETE_INVITE = 'DELETE_INVITE';
export const DELETE_JOB = 'DELETE_JOB';