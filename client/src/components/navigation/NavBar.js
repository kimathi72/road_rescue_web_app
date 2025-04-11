import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container"


export default function NavBar({user}) {


  return (
    <Navbar id="navBar"  className="d-flex justify-content-between">  
    <Container>
        <Navbar.Brand href="/">
        <div id="logo">
          <b id="appName">Road Rescue Web App</b>
        </div>
        </Navbar.Brand>
        <Nav>        
          {
            user ? <>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            </> :
            <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            </> 
          }
        </Nav> 
        </Container>        
    </Navbar>
  );
}
