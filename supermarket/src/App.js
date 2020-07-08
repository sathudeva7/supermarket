import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentShop, logoutShop } from "./actions/authActions";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";


import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Registeruser from "./components/auth/Registeruser";
import Loginuser from "./components/auth/Loginuser";
import Viewproducts from "./components/dashboard/viewproducts";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRouteuser from "./components/private-route/PrivateRouteuser";
import Dashboarduser from "./components/dashboard/Dashboarduser";

// Check for token to keep shop logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get shop info and exp
  const decoded = jwt_decode(token);
  // Set shop and isAuthenticated
  store.dispatch(setCurrentShop(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout shop
    store.dispatch(logoutShop());
    // Redirect to login
    window.location.href = "./login";
  }
}

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./loginuser";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="container">
          <Navbar />
        
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
         
          <Route exact path="/viewproducts" component={Viewproducts} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />

            </Switch>
          <Route exact path="/registeruser" component={Registeruser} />
          <Route exact path="/loginuser" component={Loginuser} />
          <Switch>
              <PrivateRouteuser exact path="/dashboarduser" component={Dashboarduser} />
            </Switch>
        </div>
      </Router>
      </Provider>
  
      
    );
  }
}
export default App;