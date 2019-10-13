import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import {toast} from "react-toastify";


function lookupMemberShips(user) {
  // user.customer = users.find(user => user.id === trend.customer);
  // return user.memberships;
}
export function lookupProject(projectId) {
  const projects   = JSON.parse(localStorage.getItem('projects'));
  return projects.find(item => item.project.id === projectId);
}
