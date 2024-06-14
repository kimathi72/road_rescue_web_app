import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import ImageController from "./ImageController";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'


export default function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    navigate('/signin', {state:{role: `${e.target.value}`}})
  
  };
  return (
    <Container id="hero" className="hero shadow-lg p-3 mb-5 bg-body rounded">
      <Container fluid>
      <Row>
        <Col id="banner">
          <h6 id="title" style={{color: "coral"}}>
            Real-Time Road Rescue Services Near You!
            <span style={{ color: "orange" }}>
              <h1>Your Guardian on the Go!</h1>

            </span>{" "}
          </h6>
          <p>Our road rescue app is designed to make your experience seamless. Just follow either of these links below to continue:</p>
          <Container fluid id="btnGroup"  style={{border:"2px solid black"}}>
          <Col xs={6} className="btnCol" >
            <h5>Got some car trouble?</h5>
            <p style={{color: "coral"}}>Login below for Assistance</p>
          <Button onClick={handleLogin} variant="primary" size="lg" value="driver">
            Get Assistance
          </Button>{" "}
          </Col>
          <Col xs={6} className="btnCol">
          <h5>Care to offer a helping hand?</h5>
            <p style={{color: "coral"}}>Login below as a Rescue personnel</p>
          <Button onClick={handleLogin} variant="warning" size="lg" value="responder">
            Offer Assistance
          </Button>
          </Col>
        </Container>
          </Col>
        <Col xs={8} style={{color: "coral", margin: "auto", padding: "0.5rem", borderLeft: "1px solid green "}} >
        
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <ImageController src="https://thumbs.dreamstime.com/b/car-service-transportation-concept-tow-truck-transporting-help-road-transports-wrecker-broken-auto-towing-faults-164163595.jpg" />
              {/* <Carousel.Caption >
              <p>Fast, Reliable, 24/7 Support Anywhere, Anytime</p>
            
          </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
              <ImageController src="https://thumbs.dreamstime.com/b/young-woman-standing-broken-down-car-making-phone-call-assistance-side-portrait-112578252.jpg" />
              {/* <Carousel.Caption >
              <p>Call for help when you are stranded on the side of the road, and we will be there in no time.</p>
            
          </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
              <ImageController src="https://thumbs.dreamstime.com/b/roadside-assistance-21749077.jpg" />
              {/* <Carousel.Caption >
            
            <p>Your Trusted Partner on the Road</p>
          </Carousel.Caption> */}
            </Carousel.Item>
          </Carousel>
          </Col>
      </Row>
      </Container>
      
      
    </Container>
  );
}