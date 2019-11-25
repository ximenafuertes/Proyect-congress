// @ constants
const actionTypes = require('../constants/actionTypes');
const {
    responseCongressMembers,
    responseMember,
} = require('../constants/constants');

const getCongressError = () => ({
    type: actionTypes.CONGRESS_MEMBERS_ERROR
});

const getCongressSuccess = (data) => ({
    type: actionTypes.CONGRESS_MEMBERS_SUCCESS,
    payload: data
});

const getCongressFetch = () => ({
    type: actionTypes.CONGRESS_MEMBERS_FETCH
});

function getCongressMembers(data) {
    return data.results[0].members;
};

const getCongress = (congress, chamber) => (dispatch) => {
    dispatch(getCongressFetch());
    /*fetch(`https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`, {
            method: 'GET',
            headers:{
                'X-API-Key': 'PROPUBLICA_API_KEY',
            },
    })*/
    return Promise.resolve(responseCongressMembers)
        .then(response => {
            const members = getCongressMembers(response);
            dispatch(getCongressSuccess(members));
            return members;
        })
        .catch(error => {
            dispatch(getCongressError(error));
        });
};

const getMemberError = () => ({
    type: actionTypes.GET_MEMBER_ERROR
});

const getMemberSuccess = (data) => ({
    type: actionTypes.GET_MEMBER_SUCCESS,
    payload: data
});

const getMemberFetch = () => ({
    type: actionTypes.GET_MEMBER_FETCH
});

function getMemberMembers(data) {
    return data.results[0].members;
};

const getMember = (api) => (dispatch) => {
    dispatch(getMemberFetch());
    /*fetch(api, {
            method: 'GET',
            headers:{
                'X-API-Key': 'PROPUBLICA_API_KEY',
            },
    })*/
    return Promise.resolve(responseMember)
        .then(response => {
            dispatch(getMemberSuccess(response));
            return response;
        })
        .catch(error => {
            dispatch(getMemberError(error));
        });
};

module.exports = {
    getCongress,
    getMember,
};
