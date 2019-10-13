import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import {toast} from "react-toastify";
import {Message, optionsError, optionsSuccess} from "../../constants/constants";
import React from "react";
import Request from 'helpers/polling/Request.js';
import * as constants from "constants/constants";

function lookupJob(id) {
  this.jobs = localStorage.getItem('jobs');
  return this.jobs.find(job => job.id === id);
}

export async function getPreviousMonitorTasks(thisObj,id) {
  thisObj.setState({
    taskId: id,
    isLoading: true,
  });
  try {

    await request({
      url: endpoints.getPreviousAnalysis + id,
      method: 'GET',
      headers: {
        user_id: thisObj.user.id,
        x_auth_token: thisObj.user.x_auth_token.token,
        project_id: thisObj.project_id
      }
    }).then((res) => {
      thisObj.setState({
        jobTasks: res,
        isLoading: false
      })
    });
  } catch (error) {
    toast.error(<Message name={error.data}/>, optionsError);
    if (thisObj.signal) {
      thisObj.setState({
        isLoading: false,
        error
      });
    }
  }
}

export function getJobStatus(thisObj,id) {
  new Request(endpoints.statusAnalysis + id, {
    headers: {
      user_id: thisObj.user.id,
      x_auth_token: thisObj.user.x_auth_token.token,
      project_id: thisObj.project_id
    }
  }).poll(20000).get((response) => {
    console.log(response.data);
    // you can cancel polling by returning false
    const isCompleted = localStorage.getItem('runningJobId-' + response.data.id);
    if ((isCompleted && isCompleted === 'yes') && response.data.status === 'FINISHED') {
      toast.success(<Message name={'Task Analytics Completed'}/>, optionsSuccess);
      localStorage.removeItem('runningJobId-' + response.data.id);
      this.getMonitorData( id);
      return false;
    }
    if (response.data.status === 'QUEUED' || response.data.status === 'STARTED') {
      localStorage.setItem('runningJobId-' + response.data.id, 'yes');
      thisObj.props.dispatch({
        type: constants.JOB_TASK_STATUS,
        JobTaskStatus: response.data.status
      });
    }
  });
}

export async function  getMonitorData(thisObj,id) {
  console.log('stop getting status and get result at the end');
  try {

    await request({
      url: endpoints.resultAnalysis + id,
      method: 'GET',
      headers: {
        user_id: thisObj.user.id,
        x_auth_token: thisObj.user.x_auth_token.token,
        project_id: thisObj.project_id
      }
    }).then((res) => {
      console.log(res);
      thisObj.setState({
        loading: false,
        success: true
      });
    });
  } catch (error) {
    toast.error(<Message name={error.data}/>, optionsError);
    thisObj.setState({
      loading: false,
      success: false,
      error
    });
  }
}



