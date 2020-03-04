import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Router, Switch, Redirect } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";

// Reducers
import usersReducer from "./store/reducers/users";
import remindersReducer from "./store/reducers/reminders";
import locationsReducer from "./store/reducers/locations";
import groupsReducer from "./store/reducers/groups";

// import alertReducer from  "./store/reducers/alert.reducer";
import authenticationReducer from "./store/reducers/auth.reducer";
import registerReducer from "./store/reducers/register.reducer";
import history from "./hoc/Config/history";




// Redux Chrome Devtool Extension
const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  users: usersReducer,
  reminders: remindersReducer,
  locations: locationsReducer,
  // alertReducer:alertReducer,
  auth: authenticationReducer,
  register: registerReducer,
  groups: groupsReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
