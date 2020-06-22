import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions/alert.actions';
import {Landing} from "views/Landing.jsx";
import {Login} from "views/Login.jsx";
import {Home} from "views/Home.jsx";
import Profile from "views/Profile.jsx";
import {Register} from "views/Register.jsx";
import Services from "views/Services.jsx";
import Index from "views/Index.js";


class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }
    render() {
        const { alert } = this.props;
        return (
            <div>
                        <Router history={history}>
                            <Switch>
                                <Route path="/" exact render={props => <Home {...props} />} />} />
                                <Route
                                    path="/landing-page"
                                    exact
                                    render={props => <Landing {...props} />}
                                />
                                <Route path="/login-page" exact render={props => <Login {...props} />} />
                                <Route
                                    path="/profile-page"
                                    exact
                                    render={props => <Profile {...props} />}
                                />
                                <Route
                                    path="/register-page"
                                    exact
                                    render={props => <Register {...props} />}
                                />
                                <Route
                                    path="/services/:serviceName"
                                    render={props => <Services {...props} />}
                                />
                                <Route
                                    path="/all"
                                    render={props => <Index {...props} />}
                                />
                                 <Route
                                    path="/home"
                                    render={props => <Home {...props} />}
                                />
                            </Switch>
                        </Router>
                </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };