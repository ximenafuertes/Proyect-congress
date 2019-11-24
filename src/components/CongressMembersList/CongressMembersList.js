import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import get from 'lodash/get';
import './congressMembersList.scss';

//@ Actions
import ActionsCongressMembers from '../../actions/congressMembers';

class CongressMembersList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCongressMembers();
    }

    buildHeaderList = () => {
        return (
            <thead>
                <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Fax</th>
                    <th scope="col">State</th>
                    <th scope="col">State Rank</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Office</th>
                    <th scope="col">More Info</th>
                </tr>
            </thead>
        )
    }

    buildFullName = (member) => (
        <div className="congress-members-list__full-name">
            <div className="congress-members-list__name">
                {get(member, 'first_name')} {get(member, 'last_name')}
            </div>
            <div className="congress-members-list__title">
                {get(member, 'title')}
            </div>
        </div>
    )

    buildRow = (member) => (
        <tr>
            <th>
                {this.buildFullName(member)}
            </th>
            <td>
                {get(member, 'date_of_birth')}
            </td>
            <td>
                {get(member, 'phone')}
            </td>
            <td>
                {get(member, 'fax')}
            </td>
            <td>
                {get(member, 'state')}
            </td>
            <td>
                {get(member, 'state_rank')}
            </td>
            <td>
                {get(member, 'gender')}
            </td>
            <td>
                {get(member, 'office')}
            </td>
            <td>
                <button type="button" className="btn btn-outline-info">
                    Info
                </button>
            </td>
        </tr>
    )
//onClick={get(member, 'api_uri')}
    buildContentList = () => (
        <tbody>
            {map(get(this.props.immCongress, 'members'), (member, index) => {
                return (
                    this.buildRow(member)
                );
            })}
        </tbody>
    );

    render = () => (
        <div className="congress-members-list__content">
            <table className="table table-striped w-auto congress-members-list__table">
                {this.buildHeaderList()}
                {this.buildContentList()}
            </table>
        </div>
    );
}

CongressMembersList.PropTypes = {
    immCongress: PropTypes.object,
    getCongressMembers: PropTypes.func,
}

export default connect(
    state => ({
        immCongress: state.congressMembers
    }),
    dispatch => ({
        getCongressMembers: bindActionCreators(ActionsCongressMembers.getCongress, dispatch),
    })
)(CongressMembersList);