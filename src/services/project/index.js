import request from 'helpers/request.js';
import * as endpoints from 'constants/endpoints.json';
import {toast} from "react-toastify";


// Mock data


const projects = [
  {
    id: 'DEV730658',
    name: 'project A',
    role: 'Owner',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project B',
    role: 'Member',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  },
  {
    id: 'DEV730658',
    name: 'project C',
    role: 'Admin',
    createdAt: 1555016400000,
  }
];


function lookupMemberShips(user) {
  // user.customer = users.find(user => user.id === trend.customer);
  // return user.memberships;
}
export function lookupProject(projectId) {
  const projects   = JSON.parse(localStorage.getItem('projects'));
  return projects.find(item => item.project.id === projectId);
}
