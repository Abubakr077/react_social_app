import * as constants from 'constants/constants.js';

const Reducers = (state = [], action) => {
  switch (action.type) {
    case constants.ADD_USER:
      return {
        ...state,
        authenticate: true,
        user: action.user,
        projects: action.user.memberships,
        invites: action.user.project_invites
      };
    case constants.ADD_PROJECTS:
      return {
        ...state,
        projects: action.projects,
        user: state.user
      };
    case constants.ADD_PROJECT:
      return {
        ...state,
        projects: state.projects.concat([action.project])
      };
    case constants.JOB_TASK_STATUS:
      return {
        ...state,
        JobTaskId: action.id
      };
    case constants.DELETE_PROJECT:
      return Object.assign({}, state, {
        projects: [...action.projects.filter(item => item.project.id !== action.id)]
      });
    case constants.DELETE_INVITE:
      return Object.assign({}, state, {
        invites: [...action.invites.filter(inv => inv.id !== action.invite.id)]
      });
    default:
      return state;
  }
};
export default Reducers;
