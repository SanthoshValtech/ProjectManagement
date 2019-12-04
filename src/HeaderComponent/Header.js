import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: #9fffcb;
    &:hover {
      color: white;
    }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9fffcb;
    &:hover {
      color: white;
    }
  }
  .form-center {
    position: absolute !important;
    left: 40%;
    right: 30%;
  }
`;
export const Header = () => (
  <Styles>
    <Navbar expand="lg">
      {/* <Navbar.Brand href="/">Project Management App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form> */}
      <h1 className="form-center navbar-brand">Project Management App</h1>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
