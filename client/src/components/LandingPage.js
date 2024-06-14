import React, { useState, useEffect } from 'react'
import { useNavigate , useLocation} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export default function LandingPage() {
  const location = useLocation()
  const role = location.state.role
  const [features, setFeatures] = useState({})
  const navigate = useNavigate()
  const token =localStorage.getItem('jwt')
  useEffect(()=>{
    fetch('/features', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((r) =>r.json()).then(data => setFeatures(data.filter(feature => feature.role === role)))
  },[token,role])

  return (
    <Container>
    <h3>Home Page</h3>
    <div>
    {
        features.map(feature => {
            <Card key={feature.id} onClick={navigate(`${feature.url}`, {state: {role: role}})}>
                <Card.Header>
                    <h4>{feature.title}</h4>
                    <i className= {feature.icon} ></i>
                    </Card.Header>
                <Card.Body>
                    <p>{feature.description}</p>
                </Card.Body>

            </Card>
        })
    }

    </div>
    </Container>
  )
}
