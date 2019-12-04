import React from "react";
import Home from "../HeaderComponent/Home";
import About from "../HeaderComponent/About";
import Employee from "../Components/Employee";
import Project from "../Components/Project";
import Task from "../Components/Task";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./SideBar";

function Navigation() {
  return (
    <Router>
      <div className="Navigation">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"Navigation"} />
        <div id="page-wrap">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/employees" exact component={Employee} />
            <Route path="/projects" exact component={Project} />
            <Route path="/tasks" exact component={Task} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Navigation;
