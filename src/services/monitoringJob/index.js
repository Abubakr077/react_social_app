import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import {toast} from "react-toastify";
import {Message, optionsError, optionsSuccess} from "../../constants/constants";
import React from "react";
import Request from 'helpers/polling/Request.js';

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
    console.log(error);
    toast.error(<Message name={error.data}/>, optionsError);
    if (thisObj.signal) {
      thisObj.setState({
        isLoading: false,
        error
      });
    }
  }
}

export async function getJobStatus(thisObj,job,id) {
  await new Request(endpoints.statusAnalysis + id, {
    headers: {
      user_id: thisObj.user.id,
      x_auth_token: thisObj.user.x_auth_token.token,
      project_id: thisObj.project_id
    }
  }).poll(20000).get((response) => {
    console.log(response.data);
    // you can cancel polling by returning false
    const {jobsStatus} = thisObj.state;
    thisObj.setState({
      jobsStatus: jobsStatus.map(el => (el.id === job.id ?
          Object.assign({}, el, {
            status: response.data.status
          })
          : el)),
    });
    const isCompleted = localStorage.getItem('runningJobId-' + response.data.id);
    if ((isCompleted && isCompleted === 'yes') && response.data.status === 'FINISHED') {
      thisObj.setState({
        jobsStatus: jobsStatus.map(el => (el.id === job.id ?
            Object.assign({}, el, {
              loading: false,
              success: true,
              status: response.data.status
            })
            : el)),
      });
      toast.success(<Message name={'Task Analytics Completed'}/>, optionsSuccess);
      localStorage.removeItem('runningJobId-' + response.data.id);
      // getMonitorData(thisObj,id);
      return false;
    }
    if (response.data.status === 'QUEUED' || response.data.status === 'STARTED') {
      localStorage.setItem('runningJobId-' + response.data.id, 'yes');
    }
  });
}



