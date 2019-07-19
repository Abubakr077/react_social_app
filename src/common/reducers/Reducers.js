const Reducers = (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_NOTE_BOOKS':
            // return state.concat([action.data]);
            return action.data;

        default:
            return state;
    }
}
export default Reducers;