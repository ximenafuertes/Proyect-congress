import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import get from 'lodash/get';
import includes from 'lodash/includes';
import head from 'lodash/head';
import Switch from "react-switch";
import './advancedSearch.scss';

export default class AdvancedSearch extends React.Component {
    getKeys = () => {
        const { immCongress } = this.props;
        const member = head(get(immCongress, 'members'));
        return Object.keys(member);
    }

    buildAdvancedSearch = () => {
        return (
            <div className="advanced-search__options">
                <select className="custom-select advanced-search__options-select" id="advancedSearch">
                    <option selected>Search By</option>
                    {map(this.getKeys(), (key) => {
                        return <option value={key}>{`${key}`}</option>
                    })}
                </select>
                <input onChange={this.props.onSearch} className="advanced-search__options-input" type="text" className="form-control" />
            </div>
        )
    }

    render = () => {
        const advancedSearch = this.props.isAdvancedSearchChecked ? this.buildAdvancedSearch() : null;
        return (
            <div className="advanced-search__content">
                <div className="advanced-search__text">
                    View Advanced Search
                </div>
                <Switch onChange={this.props.handleChangeAdvancedSearch} checked={this.props.isAdvancedSearchChecked} />
                { advancedSearch }
            </div>
        )
    };
}

AdvancedSearch.PropTypes = {
    immCongress: PropTypes.object,
    getCongressMembers: PropTypes.func,
    onSearch: PropTypes.func,
    handleChangeAdvancedSearch: PropTypes.func,
    isAdvancedSearchChecked: PropTypes.bool,
}
