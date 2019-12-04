import React, { Component } from "react";
import axios from "axios";
import Pagination from "../UtilityComponent/Pagination";
import {
  Input,
  FormGroup,
  FormFeedback,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button
} from "reactstrap";

class Employee extends Component {
  state = {
    employees: [],
    currentPage: 1,
    recordsPerPage: 3,
    newEmployeeData: {
      firstName: "",
      lastName: "",
      role: ""
    },
    editEmployeeData: {
      id: "",
      firstName: "",
      lastName: "",
      role: ""
    },
    editEmployeeModal: false,
    newEmployeeModal: false,
    validate: {
      firstNameValid: false,
      lastNameValid: false,
      roleValid: false
    },
    errorMessage: {
      firstName: "",
      lastName: "",
      role: ""
    },
    validateEdit: {
      firstNameValid: true,
      lastNameValid: true
    }
  };

  componentDidMount() {
    this._getEmployees();
  }
  getAddress() {
    return "http://localhost:53295";
  }
  _getEmployees() {
    axios
      .get(this.getAddress() + "/api/Employee/GetAllEmployee")
      .then(Response => {
        this.setState({
          employees: Response.data
        });
      });
  }
  toggleNewEmployeeModal() {
    this.setState({
      newEmployeeModal: !this.state.newEmployeeModal,
      newEmployeeData: {
        firstName: "",
        lastName: "",
        role: ""
      },
      validate: {
        firstNameValid: false,
        lastNameValid: false,
        roleValid: false
      },
      errorMessage: {
        firstName: "",
        lastName: "",
        role: ""
      }
    });
    // this.state.newEmployeeModal = true;
  }
  addEmployee() {
    axios
      .post(
        this.getAddress() + "/api/Employee/AddEmployee",
        this.state.newEmployeeData
      )
      .then(Response => {
        // let { employees } = this.state;
        // employees.push(Response.data);
        console.log("Response.data", Response.data);
        if (Response.data !== 0) {
          this._getEmployees();
          this.setState({
            //   employees,
            newEmployeeModal: false,
            newEmployeeData: {
              firstName: "",
              lastName: "",
              role: ""
            }
          });
        } else {
          this.setState({
            validate: {
              firstNameValid: true,
              lastNameValid: false,
              roleValid: true
            },
            errorMessage: {
              lastName: "An Employee with this LastName already exist"
            }
          });
        }
      });
  }
  toggleEditEmployeeModal() {
    this.setState({
      editEmployeeModal: !this.state.editEmployeeModal
    });
  }
  editEmployee(id, firstName, lastName, role) {
    this.setState({
      editEmployeeData: { id, firstName, lastName, role },
      validateEdit: {
        firstNameValid: true,
        lastNameValid: true
      },
      errorMessage: {
        firstName: "",
        lastName: "",
        role: ""
      },
      editEmployeeModal: !this.state.editEmployeeModal
    });
  }
  updateEmployee() {
    let { id, firstName, lastName, role } = this.state.editEmployeeData;
    axios
      .put(this.getAddress() + "/api/Employee/UpdateEmployee", {
        id,
        firstName,
        lastName,
        role
      })
      .then(Response => {
        console.log("Response.data", Response.data);
        if (Response.data !== 0) {
          this._getEmployees();
          this.setState({
            editEmployeeModal: false,
            editEmployeeData: {
              id: "",
              firstName: "",
              lastName: "",
              role: ""
            }
          });
        } else {
          this.setState({
            validateEdit: {
              firstNameValid: true,
              lastNameValid: false
            },
            errorMessage: {
              lastName: "An Employee with this LastName already exist"
            }
          });
        }
      });
  }
  deleteEmployee(id) {
    axios
      .delete(this.getAddress() + "/api/Employee/DeleteEmployee?Id=" + id)
      .then(Response => {
        this._getEmployees();
      });
  }
  // validateFirstName(e) {
  //   let validate = this.state.validate;
  //   if (!e.target.value) {
  //     validate.firstNameValid = false;
  //   } else {
  //     validate.firstNameValid = true;
  //   }
  //   this.setState({ validate });
  // }
  // validateLastName(e) {
  //   let validate = this.state.validate;
  //   if (!e.target.value) {
  //     validate.lastNameValid = false;
  //   } else {
  //     validate.lastNameValid = true;
  //   }
  //   this.setState({ validate });
  // }
  // validateRole(e) {
  //   debugger;
  //   let validate = this.state.validate;
  //   if (!e.target.value) {
  //     validate.roleValid = false;
  //   } else {
  //     validate.roleValid = true;
  //   }
  //   this.setState({ validate });
  // }
  // validateEditFirstName(e) {
  //   let validateEdit = this.state.validateEdit;
  //   if (!e.target.value) {
  //     validateEdit.firstNameValid = false;
  //   } else {
  //     validateEdit.firstNameValid = true;
  //   }
  //   this.setState({ validateEdit });
  // }
  // validateEditLastName(e) {
  //   let validateEdit = this.state.validateEdit;
  //   if (!e.target.value) {
  //     validateEdit.lastNameValid = false;
  //   } else {
  //     validateEdit.lastNameValid = true;
  //   }
  //   this.setState({ validateEdit });
  // }
  validateAddEmployee(event) {
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
  }
  validateEditEmployee(event) {
    const { id, value } = event.target;
    let validate = this.state.validateEdit;
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
      default:
        break;
    }
    this.setState({ validate, errors });
  }
  render() {
    const isValid =
      this.state.validate.firstNameValid &&
      this.state.validate.lastNameValid &&
      this.state.validate.roleValid;
    const isValidEdit =
      this.state.validateEdit.firstNameValid &&
      this.state.validateEdit.lastNameValid;
    let employees = this.state.employees.map(employee => {
      return (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.role}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editEmployee.bind(
                this,
                employee.id,
                employee.firstName,
                employee.lastName,
                employee.role
              )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteEmployee.bind(this, employee.id)}
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
    const currentRecords = employees.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    const paginate = pageNumeber =>
      this.setState({
        currentPage: pageNumeber
      });
    const style =
      this.state.employees.length < this.state.recordsPerPage
        ? { display: "none" }
        : {};

    return (
      <div className="App container">
        {/* <h1>Project Management App</h1> */}
        <Button
          className="my-3"
          color="primary"
          onClick={this.toggleNewEmployeeModal.bind(this)}
        >
          Add Employee
        </Button>
        {/* <Button
          color="Secondary"
          onClick={this.toggleNewEmployeeModal.bind(this)}
        >
          Cancel
        </Button> */}
        <Modal
          isOpen={this.state.newEmployeeModal}
          toggle={this.toggleNewEmployeeModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewEmployeeModal.bind(this)}>
            Add New Employee
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="firstName">FirstName</Label>
              <Input
                id="firstName"
                value={this.state.newEmployeeData.firstName}
                valid={this.state.validate.firstNameValid === true}
                invalid={this.state.validate.firstNameValid === false}
                onChange={e => {
                  // this.validateFirstName(e);
                  this.validateAddEmployee(e);
                  let { newEmployeeData } = this.state;
                  newEmployeeData.firstName = e.target.value;
                  this.setState({ newEmployeeData });
                }}
              />
              <FormFeedback invalid="true">
                {this.state.errorMessage.firstName}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="lastName">LastName</Label>
              <Input
                id="lastName"
                value={this.state.newEmployeeData.lastName}
                valid={this.state.validate.lastNameValid === true}
                invalid={this.state.validate.lastNameValid === false}
                onChange={e => {
                  // this.validateLastName(e);
                  this.validateAddEmployee(e);
                  let { newEmployeeData } = this.state;
                  newEmployeeData.lastName = e.target.value;
                  this.setState({ newEmployeeData });
                }}
              />
              <FormFeedback invalid="true">
                {this.state.errorMessage.lastName}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="selectRole"
                id="role"
                value={this.state.newEmployeeData.role}
                valid={this.state.validate.roleValid === true}
                invalid={this.state.validate.roleValid === false}
                onChange={e => {
                  this.validateAddEmployee(e);
                  let { newEmployeeData } = this.state;
                  newEmployeeData.role = e.target.value;
                  this.setState({ newEmployeeData });
                }}
              >
                <option hidden value="">
                  --select role--
                </option>
                <option>Manager</option>
                <option>TeamLead</option>
                <option>Engineer</option>
              </Input>
              <FormFeedback invalid="true">
                {this.state.errorMessage.role}
              </FormFeedback>
              {/* <Input
                id="role"
                value={this.state.newEmployeeData.role}
                onChange={e => {
                  let { newEmployeeData } = this.state;
                  newEmployeeData.role = e.target.value;
                  this.setState({ newEmployeeData });
                }}
              /> */}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              disabled={!isValid}
              onClick={this.addEmployee.bind(this)}
            >
              Add
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewEmployeeModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.editEmployeeModal}
          toggle={this.toggleEditEmployeeModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditEmployeeModal.bind(this)}>
            Update Employee
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="firstName">FirstName</Label>
              <Input
                id="firstName"
                value={this.state.editEmployeeData.firstName}
                valid={this.state.validateEdit.firstNameValid === true}
                invalid={this.state.validateEdit.firstNameValid === false}
                onChange={e => {
                  this.validateEditEmployee(e);
                  let { editEmployeeData } = this.state;
                  editEmployeeData.firstName = e.target.value;
                  this.setState({ editEmployeeData });
                }}
              />
              <FormFeedback invalid="true">
                {this.state.errorMessage.firstName}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="lastName">LastName</Label>
              <Input
                id="lastName"
                value={this.state.editEmployeeData.lastName}
                valid={this.state.validateEdit.lastNameValid === true}
                invalid={this.state.validateEdit.lastNameValid === false}
                onChange={e => {
                  this.validateEditEmployee(e);
                  let { editEmployeeData } = this.state;
                  editEmployeeData.lastName = e.target.value;
                  this.setState({ editEmployeeData });
                }}
              />
              <FormFeedback invalid="true">
                {this.state.errorMessage.lastName}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="selectRole"
                id="role"
                valid
                value={this.state.editEmployeeData.role}
                onChange={e => {
                  let { editEmployeeData } = this.state;
                  editEmployeeData.role = e.target.value;
                  this.setState({ editEmployeeData });
                }}
              >
                <option>Manager</option>
                <option>TeamLead</option>
                <option>Engineer</option>
              </Input>
              {/* <Input
                id="role"
                value={this.state.editEmployeeData.role}
                onChange={e => {
                  let { editEmployeeData } = this.state;
                  editEmployeeData.role = e.target.value;
                  this.setState({ editEmployeeData });
                }}
              /> */}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              disabled={!isValidEdit}
              onClick={this.updateEmployee.bind(this)}
            >
              Update
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditEmployeeModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {employees} */}
            {currentRecords}
          </tbody>
        </Table>
        <div style={style}>
          {" "}
          <Pagination
            currentPage={this.state.currentPage}
            recordsPerPage={this.state.recordsPerPage}
            totalRecords={this.state.employees.length}
            paginate={paginate}
          />
        </div>
      </div>
    );
  }
}

export default Employee;
