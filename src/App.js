import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "./utils/util";

import Loader from "./components/Loader";
import "./index.css";
import AppProvider from "./contextAPI/context";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Locate = lazy(() => import("./pages/Track"));
const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/dashboard/Home"));
const Edit = lazy(() => import("./pages/dashboard/Edit"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/locate" component={Locate} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/app" component={Dashboard} />
            <ProtectedRoute exact path="/app/edit/:id" component={Edit} />
          </Switch>
        </Router>
      </AppProvider>
    </Suspense>
  );
};

export default App;
