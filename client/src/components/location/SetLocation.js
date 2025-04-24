import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col';
import IncidentLocation from '../incident/IncidentLocation';

export default function SetLocation({user}) {
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    function setCurrentLocation () {
        fetch("/locations", {
            method: "POST", 
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                location: {
                    user_id: user.id, 
                    latitude: position["latitude"], 
                    longitude: position["longitude"]
                }
            }
        }).then(r => r.json).then(data => {
            user.location = data 
            navigate('/landingPage', {state: {role: user.role}} )
        } )

    }

    function getLocation () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
              setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            });
          } else {
            console.log("Geolocation is not available in your browser.");
          }
    }
    function chooseLocation () {
        let locationDiv = document.getElementById('chooseLocation')
        locationDiv.innerHTML = <IncidentLocation location={position}/>
        return locationDiv
    }

  return (
    <Row>
        <Col sm={2} id='getCurrentLocation'>
        <Button className='btn btn-default' onClick={getLocation}>
            use your current location
        </Button></Col>
        <Col sm={2} id="chooseLocation">
        <Button className='btn btn-secondary' onClick={chooseLocation}>
            choose on a map 
        </Button>
        </Col>
        
        
    </Row>
  )
}
