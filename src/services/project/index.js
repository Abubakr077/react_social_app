// Mock data
import trends from 'data/trends';
import users from 'data/users';


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

export const getProjects = () => {
  const projects   = JSON.parse(localStorage.getItem('projects'));
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        projects: projects,
        projectsTotal: projects.length
      });
    }, 700);
  });
};
export const getInvites = () => {
  const invites   = JSON.parse(localStorage.getItem('invites'));
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        invites: invites
      });
    }, 700);
  });
};