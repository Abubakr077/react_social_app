// Mock data
import trends from 'data/trends';
import users from 'data/users';

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
  console.log(invites);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        projects: invites,
        projectsTotal: invites.length
      });
    }, 700);
  });
};