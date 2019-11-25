import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';
import get from 'lodash/get';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import './congressMembersList.scss';

//@ Actions
import ActionsCongressMembers from '../../actions/congressMembers';
import congressMembers from '../../reducers/congressMembers';

class CongressMembersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            congressMembersCache: [],
            inputSearch: '',
            isAdvancedSearchChecked: false,
        }
        this.handleChangeAdvancedSearch = this.handleChangeAdvancedSearch.bind(this);
    }

    componentDidMount() {
        this.props.getCongressMembers()
            .then(response => {
                this.setState({ congressMembersCache: response })
            });
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
            {map(this.state.congressMembersCache, (member, index) => {
                return (
                    this.buildRow(member)
                );
            })}
        </tbody>
    );

    handleChangeAdvancedSearch(checked) {
        this.setState({ isAdvancedSearchChecked: checked });
    }

    getAdvancedSearchOption = () => {
        const element = document.getElementById("advancedSearch");
        return element.options[element.selectedIndex].value;
    }

    onSearch = (e) => {
        const { immCongress } = this.props;
        const searchValue = e.target.value.toLowerCase();
        if(this.state.isAdvancedSearchChecked) {
            const searchBy = this.getAdvancedSearchOption();
            const congressMembersSearch = filter(get(immCongress, 'members'), (member) => {
                const value = get(member, searchBy).toLowerCase();
                return includes(value, searchValue);
            })
            this.setState({ congressMembersCache: congressMembersSearch });
        }
        
        const congressMembersSearch = filter(get(immCongress, 'members'), (member) => {
            return filter(member, (value, key) => includes(value.toLowerCase(), searchValue)).length > 0;
        })
        this.setState({ congressMembersCache: congressMembersSearch });
    }

    render = () => {
        return (
            <div className="congress-members-list__content">
                <div className="congress-members-list__search">
                    <div className="congress-members-list__search-text">
                        Search
                    </div>
                    <input onChange={this.onSearch} className="congress-members-list__search-input" type="text" className="form-control" />
                </div>
                <AdvancedSearch 
                    immCongress={this.props.immCongress}
                    getCongressMembers={this.props.getCongressMembers}
                    onSearch={this.onSearch}
                    handleChangeAdvancedSearch={this.handleChangeAdvancedSearch}
                    isAdvancedSearchChecked={this.state.isAdvancedSearchChecked}
                />
                <div className="congress-members-list__table-members">
                    <table className="table table-striped w-auto congress-members-list__table">
                        {this.buildHeaderList()}
                        {this.buildContentList()}
                    </table>
                </div>
            </div>
        )
    };
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