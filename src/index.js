import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth";
import SplashLayout from "./layouts/Splash";

// Reducers
import usersReducer from "./store/reducers/users";
import remindersReducer from "./store/reducers/reminders";
import locationsReducer from "./store/reducers/locations";
import calendarReducer from "./store/reducers/calendar"
import userGroupsReducer from "./store/reducers/user.groups";
import userInfoReducer from "./store/reducers/user.info";

import bulkLocationReducer from "./store/reducers/bulk-location";

import permissionReducer from "./store/reducers/permission";

import authenticationReducer from "./store/reducers/auth";
import registerReducer from "./store/reducers/register";
import history from "./hoc/Config/history";
import NotFoundPage from "./containers/NotFound/NotFoundPage";
import { constants } from "./variables/constants";

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
  permission: permissionReducer,
  register: registerReducer,
  userGroups: userGroupsReducer,
  userInfo: userInfoReducer,
  bulkLocation: bulkLocationReducer,
  calendar: calendarReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));




// store.subscribe(() => {
//   token = store.getState().auth.token;
//   console.log("Bence oldu", token);
// })

let token = localStorage.getItem(constants.TOKEN);

let isRememberMe = localStorage.getItem(constants.REMEMBERME);

console.log('İS',isRememberMe);


ReactDOM.render(


  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout  {...props} />} />
       

        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/splash" render={props => <SplashLayout {...props} />} />
         
    
        {token &&  isRememberMe ?  <Redirect   from="/" to="/admin/index" /> : <Redirect   from="/" to="/auth/login" />  }
       

      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
