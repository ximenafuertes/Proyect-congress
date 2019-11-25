// @ constants
const actionTypes = require('../constants/actionTypes');
const {
    responseCongressMembers
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
    /*fetch(`https://api.propublica.org/congress/v1/115/senate/members.json`, {
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

module.exports = {
    getCongress,
};
