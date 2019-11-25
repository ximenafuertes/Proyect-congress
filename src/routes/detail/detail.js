
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import replace from 'lodash/replace';
import './detail.scss';

class Detail extends React.Component {
    buildTable = () => (
        <ul className="list-group">
            {map(this.props.immCongress.memberData, (value, key) => {
                if(key === 'roles') {
                    //map extructure inside roles
                }
                
                return (
                    <li className="list-group-item" key={key}>
                        <div className="detail__item">
                            {`${replace(key, '_', ' ')}`}
                        </div>
                        {`${value}`}
                    </li>
                )
            })}

            
        </ul>
    );

    backButton = () => (
        <Link to="/">
            <button type="button" className="btn btn-outline-info detail__button">
                Go Back
            </button>
        </Link>
    );

    render() {
        return (
            <div className="detail">
                {this.buildTable()}
                {this.backButton()}
            </div>
        );
    }
}

Detail.PropTypes = {
    immCongress: PropTypes.object,
}

export default connect(
    state => ({
        immCongress: state.congressMembers,
    }),
)(Detail);
