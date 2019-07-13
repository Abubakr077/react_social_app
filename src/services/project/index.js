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

function lookupTrend(trend) {
  trend.customer = users.find(user => user.id === trend.customer);

  return trend;
}

export const getProjects = (limit = 6) => {

  return new Promise(resolve => {
    const projectsLookup = JSON.parse(JSON.stringify(projects));

    setTimeout(() => {
      resolve({
        projects: projectsLookup,
        projectsTotal: projects.length
      });
    }, 700);
  });
};
