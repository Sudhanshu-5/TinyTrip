import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuth from './Components/Admin/useAuth';
import Login from './Components/Admin/Login';
import { ToastProvider } from 'react-toast-notifications';
import Dashboard from './Components/Admin/Dashboard';
import Itenary from './Components/Itenary';
import Homepage from './Components/Homepage';
import Themes from './Components/themes';
import Theme from './Components/theme';
import Destinations from './Components/destination';
import Testimonials from './Components/testimonial'
import Option from './Components/option'
// import Construction from './Components/Construction/Construction';

function App() {
  const [authorise, unauthorise, ProtectedRoutes] = useAuth();

  if(authorise===unauthorise)
    console.log("")

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/home">
            <Homepage />
          </Route>
          <Route path={`/options/Themes/:themeName`}>
            <Theme />
          </Route>
          <Route path={`/options/Destination Types/:typeName`}>
            <Destinations />
          </Route>
          <Route path="/testimonial">
            <Testimonials />
          </Route>
          <Route exact path="/options/:option">
            <Option />
          </Route>
          <Route exact path="/destination/:destinationName">
            <Themes />
          </Route>
          <Route exact path="/destination/:destinationName/:packageName">
            <ToastProvider placement='bottom-center'>
              <Itenary />
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
};

export default App;
