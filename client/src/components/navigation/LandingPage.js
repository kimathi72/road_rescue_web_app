import React, { useState, useEffect } from 'react'
import { useNavigate , useLocation} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

export default function LandingPage() {
  const location = useLocation()
  const role = location.state.role
  const [features, setFeatures] = useState([])
  const navigate = useNavigate()
  const token =localStorage.getItem('jwt')
  useEffect(()=>{
    fetch('/features', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((r) =>r.json()).then(data => {
        
        setFeatures(data.filter(feature => feature.role === role))})
  },[token,role])
  
//   const handleClick = (url) => {
//     navigate(`${url}`, {state: {role: role}})
//   }

  return (
    <Container>
    <h3>Home Page</h3>
    <div className='featuresList'>
    {
       features.map((feature) =>{
        return (
        <Card className='feature' key={feature.id} onClick={(e) => {e.preventDefault(); navigate(`${feature.url}`, {state: {role: role}})}}>
            <Card.Header className='featureHeader'>
                <h4>{feature.title}</h4>
                <i className= {feature.icon} ></i>
                </Card.Header>
            <Card.Body className='featureBody'>
                <p>{feature.description}</p>
            </Card.Body>

        </Card>)}
    ) 
    }

    </div>
    </Container>
  )
}
