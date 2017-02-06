import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import PageNotFound from './components/PageNotFound';

const Routes = (props) => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="*" component={PageNotFound}/>
        </Route>
    </Router>
);

export default Routes;
