import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Settings from './pages/Settings';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Settings} path="/settings" />
        </BrowserRouter>
    )
}

export default Routes;