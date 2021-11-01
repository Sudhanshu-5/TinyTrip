import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuth from "./Components/Admin/useAuth";
import Login from "./Components/Admin/Login";
import { ToastProvider } from "react-toast-notifications";
import Dashboard from "./Components/Admin/Dashboard";
import Homepage from "./Components/Homepage";
import Testimonials from "./Components/testimonial";
import TestDetails from "./Components/TestComponents/TestDetails.js";
import TestResults from "./Components/TestComponents/TestResults";

function App() {
  const [authorise, unauthorise, ProtectedRoutes] = useAuth();

  if (authorise === unauthorise) console.log("");

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/testimonial">
            <Testimonials />
          </Route>
          <Route exact path="/details/:propId">
            <ToastProvider placement="bottom-center">
              <TestDetails />
            </ToastProvider>
          </Route>
          <Route exact path="/results">
            <ToastProvider placement="bottom-center">
              <TestResults />
            </ToastProvider>
          </Route>
          <Route path="/adminLogin">
            <ToastProvider>
              <Login />
            </ToastProvider>
          </Route>
          <ProtectedRoutes path="/adminDashboard">
            <ToastProvider>
              <Dashboard />
            </ToastProvider>
          </ProtectedRoutes>
          <Route path="*">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
