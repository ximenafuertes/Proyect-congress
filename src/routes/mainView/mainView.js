import './mainView.scss';
import React from 'react';
import CongressMembersList from '../../components/CongressMembersList/CongressMembersList';
import './mainView';

class MainView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-view">
                <header className="main-view__header">
                    <h2>Congress members</h2>
                </header>
                <div className="container-fluid">
                    <CongressMembersList />
                </div>
                <footer className="main-view__footer">
                    <a>Leniolabs app</a>
                </footer>
            </div>
        );
    }
}

export default MainView;