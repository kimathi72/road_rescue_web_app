import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import DownloadPdf from "./DownloadPdf";

export default function NavBar({user}) {

  const role = user.role
  const switchRoles = (role) => {
    switch (role) {
      case "admin":
        return (
          <>
            <Nav.Link href="/requests">Requests</Nav.Link>
            <Nav.Link href="/responders">Responders</Nav.Link>
          </>
        );
      case "driver":
        return (
          <>
            <Nav.Link href="/makeRequest">Make Request</Nav.Link>
            <Nav.Link href="/respondersList">Responders</Nav.Link>
            <Nav.Link href="/notifications">Notifications</Nav.Link>
            <Nav.Item>
              <NavDropdown title="Account" id="account-nav">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/myRequests">
                  Requests History{" "}
                </NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </>
        );
      case "responder":
        return (
          <>
            <Nav.Link href="/requests">Requests</Nav.Link>
            <Nav.Link href="./responses">Responses</Nav.Link>
            <Nav.Link href="./notifications"> Notifications</Nav.Link>
            <Nav.Item>
              <NavDropdown title="Account" id="account-nav">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/myReviews">
                  My Reviews{" "}
                </NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </>
        );
      default:
        return (
          <>
            <DownloadPdf />
          </>
        );
    }
  };

  return (
    <Navbar style={{backgroundColor:"#002244"}}>
      <Container id="navbar" className="navbar" style={{backgroundColor:"#A3C1AD", margin: "auto", padding:"1rem"}}>
        <Navbar.Brand href="/Dashboard">Road Rescue Assistance</Navbar.Brand>
        <Nav className="justify-content-end">
        
          {switchRoles(role)}
        </Nav>
      </Container>
    </Navbar>
  );
}
