import React from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Landing from "./components/home/Landing";
import Navbar from "./components/home/Navbar";
import Users from "./components/admin/Users";
import AddAd from "./components/Ads/AddAd";
import DeleteAd from "./components/Ads/DeleteAd";
import EditAd from "./components/Ads/EditAd";
import Footer from "./components/home/Footer";
import AdsList from "./components/Ads/AdsList";
import AdInfo from "./components/info/AdInfo";
import AdsByFilter from "./components/Ads/AdsByFilter";
import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // //Check fro expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime)
  //   // Logout user
  //   store.dispatch(logoutUser());
  // // Redirect to login
  // window.location.href = "/login";
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/admin" component={Users} />
          <Route exact path="/ads/add" exact component={AddAd} />
          <Route exact path="/myads" component={DeleteAd} />
          <Route exact path="/ads/" exact component={AdsList} />
          <Route
            path="/ads/modify/:id"
            exact
            component={(props) => <EditAd id={props.match.params.id} />}
          />
          <Route
            path="/ads/search/:category"
            exact
            component={(props) => (
              <AdsByFilter category={props.match.params.category} />
            )}
          />

          <Route
            exact
            path="/ad/:id"
            exact
            component={(props) => <AdInfo id={props.match.params.id} />}
          />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
