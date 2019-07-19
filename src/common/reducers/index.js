const Reducers = (state = [], action) => {
    switch(action.type) {
        case 'ADD_USER':
            return {
                authenticate: true,
                user: action.user,
            };

        default:
            return state;
    }
}
export default Reducers;