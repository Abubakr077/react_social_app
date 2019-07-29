import * as constants from 'constants/constants.js'
const Reducers = (state = [], action) => {
    switch(action.type) {
        case constants.ADD_USER:
            return {
                authenticate: true,
                user: action.user,
                projects: action.user.memberships
            };
        case constants.ADD_PROJECTS:
            return {
                projects: action.projects,
                user: state.user,
            };
            case constants.ADD_PROJECT:
            return {
                projects: state.projects.concat([action.project]),
            };
        case constants.DELETE_PROJECT:
            return {
                projects: action.data
                // projects: [
                //     ...state.projects.slice(0, action.index),
                //     ...state.projects.slice(action.index + 1)
                // ],
            };
        default:
            return state;
    }
};
export default Reducers;
