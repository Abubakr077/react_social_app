import {toast} from "react-toastify";
import React from "react";

export const statusColors = {
    DELIVERED: 'success',
    PENDING: 'info',
    REFUND: 'danger',
    delivered: 'success',
    pending: 'info',
    refund: 'danger',
    QUEUED: 'danger',
    STARTED: 'info',
    FINISHED: 'success'
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
export const UPDATE_INVITE = 'UPDATE_INVITE';
export const JOB_TASK_STATUS = 'JOB_TASK_STATUS';

// job creation

export const scheduleMinuteOptions = [{name:5,code:5},{name:6,code:6},{name:7,code:7},{name:8,code:8},{name:9,code:9},{name:10,code:10},{name:11,code:11},{name:12,code:12},{name:13,code:13},{name:14,code:14},{name:15,code:15},{name:16,code:16},{name:17,code:17},{name:18,code:18},{name:19,code:19},{name:20,code:20},{name:21,code:21},{name:22,code:22},{name:23,code:23},{name:24,code:24},{name:25,code:25},{name:26,code:26},{name:27,code:27},{name:28,code:28},{name:29,code:29},{name:30,code:30},{name:31,code:31},{name:32,code:32},{name:33,code:33},{name:34,code:34},{name:35,code:35},{name:36,code:36},{name:37,code:37},{name:38,code:38},{name:39,code:39},{name:40,code:40},{name:41,code:41},{name:42,code:42},{name:43,code:43},{name:44,code:44},{name:45,code:45},{name:46,code:46},{name:47,code:47},{name:48,code:48},{name:49,code:49},{name:50,code:50},{name:51,code:51},{name:52,code:52},{name:53,code:53},{name:54,code:54},{name:55,code:55},{name:56,code:56},{name:57,code:57},{name:58,code:58},{name:59,code:59}]
export const langs = [
    { code: "any", name: "Any language" }, { code: "ar", name: "Arabic" }, { code: "bn", name: "Bangla" }, { code: "eu", name: "Basque" }, { code: "bg", name: "Bulgarian" }, { code: "ca", name: "Catalan" }, { code: "hr", name: "Croatian" }, { code: "cs", name: "Czech" }, { code: "da", name: "Danish" }, { code: "nl", name: "Dutch" }, { code: "en", name: "English" }, { code: "fi", name: "Finnish" }, { code: "fr", name: "French" }, { code: "de", name: "German" }, { code: "el", name: "Greek" }, { code: "gu", name: "Gujarati" }, { code: "he", name: "Hebrew" }, { code: "hi", name: "Hindi" }, { code: "hu", name: "Hungarian" }, { code: "id", name: "Indonesian" }, { code: "it", name: "Italian" }, { code: "ja", name: "Japanese" }, { code: "kn", name: "Kannada" }, { code: "ko", name: "Korean" }, { code: "mr", name: "Marathi" }, { code: "no", name: "Norwegian" }, { code: "fa", name: "Persian" }, { code: "pl", name: "Polish" }, { code: "pt", name: "Portuguese" }, { code: "ro", name: "Romanian" }, { code: "ru", name: "Russian" }, { code: "sr", name: "Serbian" }, { code: "zh-cn", name: "Simplified Chinese" }, { code: "sk", name: "Slovak" }, { code: "es", name: "Spanish" }, { code: "sv", name: "Swedish" }, { code: "ta", name: "Tamil" }, { code: "th", name: "Thai" }, { code: "zh-tw", name: "Traditional Chinese" }, { code: "tr", name: "Turkish" }, { code: "uk", name: "Ukrainian" }, { code: "ur", name: "Urdu" }, { code: "vi", name: "Vietnamese" }];
export const target = [
    {
        name: "User",
        code: "USER"
    },
    // {
    //     name: "Keyword",
    //     code: "KEYWORD"
    // },
    {
        name: "Trend",
        code: "TREND"
    }
];
export const targetType = [
    {
        name: "Profile Info",
        code: "INFO"
    },
    {
        name: "Posts",
        code: "POST"
    }
];
export const scheduleOptions = [
    {
        name: "EVERY-N-MINUTES",
        code: "EVERY_N_MINUTES"
    },
    {
        name: "EVERY-N-HOURS",
        code: "EVERY_N_HOURS"
    },
    {
        name: "ONCE-EVERY-HOUR",
        code: "ONCE_EVERY_HOUR"
    }
];
export const numTweet = [
    {
        name: "All",
        code: "All"
    },
    {
        name: "Not Set",
        code: "-1"
    },
    {
        name: "1000",
        code: "1000"
    },
    {
        name: "2000",
        code: "2000"
    },
    {
        name: "5000",
        code: "5000"
    },
    {
        name: "10000",
        code: "10000"
    }
];
export const youtubeTypes = [
    {
        name: "Key Word",
        code: "keyword"
    },
    {
        name: "Video URL",
        code: "video"
    },
    {
        name: "Channel URL",
        code: "channel"
    }
];