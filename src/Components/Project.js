import React, { Component } from "react";
import AddProject from "./AddProject";
// import CreateProject from "./CreateProject";
import axios from "axios";
import Pagination from "../UtilityComponent/Pagination";
import {
  // Input,
  // FormGroup,
  // FormFeedback,
  // Label,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  Table,
  Button
} from "reactstrap";

class Project extends Component {
  state = {
    projects: [],
    currentPage: 1,
    recordsPerPage: 2,
    newProjectData: {
      firstName: "",
      lastName: "",
      role: ""
    },
    editProjectData: {
      id: "",
      firstName: "",
      lastName: "",
      role: ""
    },
    editProjectModal: false,
    newProjectModal: false
  };

  componentDidMount() {
    this._getProjects();
  }
  getAddress() {
    return "http://localhost:53295";
  }
  _getProjects() {
    axios
      .get(this.getAddress() + "/api/Project/GetProjectDetail")
      .then(Response => {
        this.setState({
          projects: Response.data
        });
      });
  }
  toggleNewProjectModal() {
    this.setState({
      newProjectModal: !this.state.newProjectModal,
      newProjectData: {
        firstName: "",
        lastName: "",
        role: ""
      },
      validate: {
        firstNameValid: false,
        lastNameValid: false
      }
    });
    this._getProjects();
  }

  // addProject() {
  //   <CreateProject />;
  // }

  render() {
    // const newProjectModal = false;
    // const toggle = () => (newProjectModal = !newProjectModal);
    let projects = this.state.projects.map(project => {
      return (
        <tr key={project.id}>
          <td>{project.id}</td>
          <td>{project.projName}</td>
          <td>{project.startDate}</td>
          <td>{project.active}</td>
          <td>{project.status}</td>
          <td>{project.managerName}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              // onClick={this.editEmployee.bind(
              //   this,
              //   project.id,
              //   project.firstName,
              //   project.lastName,
              //   project.role
              // )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              // onClick={this.deleteEmployee.bind(this, project.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    const indexOfLastRecord =
      this.state.currentPage * this.state.recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - this.state.recordsPerPage;
    const currentRecords = projects.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    const paginate = pageNumeber =>
      this.setState({
        currentPage: pageNumeber
      });
    const style =
      this.state.projects.length < this.state.recordsPerPage
        ? { display: "none" }
        : {};

    return (
      <div className="App container">
        <Button
          className="my-3"
          color="primary"
          onClick={this.toggleNewProjectModal.bind(this)}
        >
          Add Project
        </Button>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>ProjectName</th>
              <th>StartDate</th>
              <th>Active</th>
              <th>Status</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>{currentRecords}</tbody>
        </Table>
        <div style={style}>
          {" "}
          <Pagination
            currentPage={this.state.currentPage}
            recordsPerPage={this.state.recordsPerPage}
            totalRecords={this.state.projects.length}
            paginate={paginate}
          />
        </div>
        <div>
          <AddProject
            toggleNewProjectModal={this.toggleNewProjectModal.bind(this)}
            newProjectModal={this.state.newProjectModal}
          />
        </div>
      </div>
    );
  }
}

export default Project;
