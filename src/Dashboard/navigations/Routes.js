import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../utils/Header";
import Dashboard from "../components/dashboard";
import MyCourse from "../components/mycourse";
import Account from "../components/account";
import Profile from "../components/profile";
import TestSeries from "../components/testseries";
function Routes() {
  const [active, setActive] = useState("dashboard");
  return (
    <Router>
      <Header active={active} />
      <Switch>
        <Route
          exact
          path="/dash"
          component={() => {
            setActive("dashboard");
            return <Dashboard />;
          }}
        />
        <Route
          path="/dash/mycourse"
          component={() => {
            setActive("course");
            return <MyCourse />;
          }}
        />
        <Route
          path="/dash/myaccount"
          component={() => {
            setActive("account");
            return <Account />;
          }}
        />
        <Route
          path="/dash/profile"
          component={() => {
            setActive("profile");
            return <Profile />;
          }}
        />
        <Route
          path="/dash/testseries"
          component={() => {
            setActive("testseries");
            return <TestSeries />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
