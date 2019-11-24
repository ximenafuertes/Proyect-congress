import './index.scss';
import React from 'react';
import { Route, Link } from 'react-router-dom';
import MainView from './mainView/mainView';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="app__container">
            <Route exact path="/" component={MainView} />
        </div>
    )
    }
};

export default App;
