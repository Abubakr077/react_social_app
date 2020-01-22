function lookupMemberShips(user) {
  // user.customer = users.find(user => user.id === trend.customer);
  // return user.memberships;
}

export function lookupProject(projectId) {
  const projects = JSON.parse(localStorage.getItem('projects'));
  return projects.find(item => item.project.id === projectId);
}
