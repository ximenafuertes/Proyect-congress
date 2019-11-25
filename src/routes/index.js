import './index.scss';
import React from 'react';
import { Route, Link } from 'react-router-dom';
import MainView from './mainView/mainView';
import Detail from './detail/detail';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="app__container">
            <Route exact path="/" component={MainView} />
            <Route path="/detail" component={Detail} />
        </div>
    )
    }
};

export default App;
