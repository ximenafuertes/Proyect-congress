// @ constants
const actionTypes = require('../constants/actionTypes');

// @utilities
const { capitalize } = require('../utilities/utilities');

const initialState = () => ({
    members: [],
    isFetching: false,
    error: false,
    success: false,
    memberData: {},
    successMember: false,
    isFetchingMember: false,
    errorMember: false,
});

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
                members: action.payload,
                success: true,
                isFetching: false
            };
        case actionTypes.CONGRESS_MEMBERS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        case actionTypes.GET_MEMBER_FETCH:
            return {
                ...state,
                isFetchingMember: true
            };
        case actionTypes.GET_MEMBER_SUCCESS:
            return {
                ...state,
                memberData: action.payload.results[0],
                successMember: true,
                isFetchingMember: false
            };
        case actionTypes.GET_MEMBER_ERROR:
            return {
                ...state,
                isFetchingMember: false,
                errorMember: true
            };
        default:
            return state;
    }
};

export default congressMembers;
