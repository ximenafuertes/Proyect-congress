// @ constants
const actionTypes = require('../constants/actionTypes');

// @utilities
const { capitalize } = require('../utilities/utilities');

const initialState = () => ({
    members: [],
    isFetching: false,
    error: false,
    success: false
});

function getCongressMembers(data) {
    return data.results[0].members;
};

const congressMembers = (state = initialState(), action) => {
    switch (action.type) {
        case actionTypes.CONGRESS_MEMBERS_FETCH:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.CONGRESS_MEMBERS_SUCCESS:
            return {
                ...state,
                members: getCongressMembers(action.payload),
                success: true,
                isFetching: false
            };
        case actionTypes.CONGRESS_MEMBERS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state;
    }
};

export default congressMembers;
