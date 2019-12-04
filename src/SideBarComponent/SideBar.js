import React from "react";
import { scaleRotate as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      {/* <a className="menu-item" href="/">
        Home
      </a> */}

      <Link to="/employees">Employees</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/tasks">Tasks</Link>
      {/* <a className="menu-item" href="./Components/Employee">
        Employees
      </a> 

      <a className="menu-item" href="/projects">
        Projects
      </a>

      <a className="menu-item" href="/tasks">
        Tasks
      </a>  */}
    </Menu>
  );
};
