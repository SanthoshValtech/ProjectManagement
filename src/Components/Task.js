import React, { Component } from "react";
import Background from "../underConstruction.jpg";

class Task extends Component {
  state = {};
  render() {
    return (
      <div>
        <img src={Background} className="backgroundImage" />
      </div>
    );
  }
}

export default Task;
