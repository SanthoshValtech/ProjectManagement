import React from "react";
import axios from "axios";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const CreateProject = props => {
  //   const newProjectModal = false;
  //   const toggle = () => (newProjectModal = !newProjectModal);
  const newProjectData = {
    firstName: "",
    lastName: "",
    role: ""
  };
  const validate = {
    firstNameValid: false,
    lastNameValid: false,
    roleValid: false
  };
  const consterrorMessage = {
    firstName: "",
    lastName: "",
    role: ""
  };
  const address = "http://localhost:53295";
  const addProject = () => {
    axios.post(address + "/api/Project/AddProject").then(Response => {
      // let { employees } = this.state;
      // employees.push(Response.data);
      // this._getEmployees();
    });
  };

  const projectStatus = [];
  const getProjectStatus = () => {
    axios.get(address + "/api/Project/GetProjectStatus").then(Response => {
      projectStatus = Response.data;
    });
  };

  const validateAddEmployee = event => {
    const { id, value } = event.target;
    let validate = this.state.validate;
    let errors = this.state.errorMessage;
    switch (id) {
      case "firstName":
        validate.firstNameValid = value.length <= 0 ? false : true;
        if (!validate.firstNameValid) {
          errors.firstName = "FirstName cannot be empty";
        }
        break;
      case "lastName":
        validate.lastNameValid = value.length <= 0 ? false : true;
        if (!validate.lastNameValid) {
          errors.lastName = "LastName cannot be empty";
        }
        break;
      case "role":
        validate.roleValid = value.length <= 0 ? false : true;
        if (!validate.roleValid) {
          errors.role = "Please select a Role";
        }
        break;
      default:
        break;
    }
    this.setState({ validate, errors });
  };

  return (
    <div>
      <Modal
        isOpen={props.newProjectModal}
        toggle={props.toggleNewProjectModal}
      >
        <ModalHeader toggle={props.toggleNewProjectModal}>
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
            <Label for="active">Active</Label>
            <Input type="select" id="active">
              <option disabled hidden value="">
                --select role--
              </option>
              <option>Active</option>
              <option>No</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input type="select" id="status">
              {projectStatus.map(ps => (
                <option id={ps.id} value={ps.value}>
                  ps.value
                </option>
              ))}
              {/* <option disabled hidden value="">
                --select role--
              </option>
              <option>Initiation</option>
              <option>Planning</option>
              <option>Execution</option>
              <option>Closure</option> */}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="managerName">ManagerName</Label>
            <Input id="managerName" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addProject}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={props.toggleNewProjectModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateProject;
