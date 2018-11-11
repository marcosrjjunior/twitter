import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Timeline from './pages/Timeline';

// Switch just one route will be called, once at time
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch> 
                    <Route path="/" exact component={Login} />
                    <Route path="/timeline" component={Timeline} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
