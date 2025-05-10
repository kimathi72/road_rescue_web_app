import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container"


export default function NavBar({token}) {


  return (
    <Navbar id="navBar" className="d-flex justify-content-between bg-light">  
    <Container>
        <Navbar.Brand href="/">
        <div id="logo">
          <b id="appName">Road Rescue Web App</b>
        </div>
        </Navbar.Brand>
        <Nav>        
          {
            !token ? <Nav.Link href="/signup">Sign up</Nav.Link> :  <Nav.Link href="/signout">Sign out</Nav.Link>
          }
        </Nav> 
        </Container>        
    </Navbar>
  );
}
