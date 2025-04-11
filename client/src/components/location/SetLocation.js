import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

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

    function allowLocation (e) {
        e.preventDefault()
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
              setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            });
            setCurrentLocation()
          } else {
            console.log("Geolocation is not available in your browser.");
          }
    }
    function declineLocation (e) {
        e.preventDefault() 
        navigate('/landingPage', {state: {role: user.role}} )
    }

  return (
    <Container>
        <Button className='btn btn-default' onClick={allowLocation}>
            Allow access to location service
        </Button>
        <Button className='btn btn-warning' onClick={declineLocation}>
            Skip for now 
        </Button>
    </Container>
  )
}
