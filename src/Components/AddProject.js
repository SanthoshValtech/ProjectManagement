import React, { Component } from "react";
import axios from "axios";
import {
  Input,
  FormGroup,
  // FormFeedback,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

class AddProject extends Component {
  state = {
    projectStatus: [],
    projectManagers: []
  };
  componentDidMount() {
    this.getProjectStatus();
    this.getProjectManagers();
  }
  getAddress() {
    return "http://localhost:53295";
  }
  getProjectManagers() {
    axios
      .get(this.getAddress() + "/api/Project/GetProjectManagers")
      .then(Response => {
        this.setState({
          projectManagers: Response.data
        });
      });
  }
  getProjectStatus() {
    axios
      .get(this.getAddress() + "/api/Project/GetProjectStatus")
      .then(Response => {
        this.setState({
          projectStatus: Response.data
        });
      });
  }
  addProject() {}

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.newProjectModal}
          toggle={this.props.toggleNewProjectModal}
        >
          <ModalHeader toggle={this.props.toggleNewProjectModal}>
            Add New Project
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="projectName">ProjectName</Label>
              <Input id="projectName" />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">StartDate</Label>
              <Input id="startDate" />
            </FormGroup>
            <FormGroup>
              <Label for="projectActive">Active</Label>
              <Input type="select" id="projectActive">
                <option hidden value="">
                  --select project state--
                </option>
                <option>Active</option>
                <option>No</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input type="select" id="status">
                <option hidden value="">
                  --select status--
                </option>
                {this.state.projectStatus.map(ps => (
                  <option key={ps.id} id={ps.id} value={ps.status}>
                    {ps.status}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="managerName">ManagerName</Label>
              <Input type="select" id="managerName">
                <option hidden value="">
                  --select Manager--
                </option>
                {this.state.projectManagers.map(ps => (
                  <option key={ps.id} id={ps.id} value={ps.firstName}>
                    {ps.firstName}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addProject}>
              Add
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.props.toggleNewProjectModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddProject;
