import React , {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'

export default function Profile({user}) {
  const [profile, setProfile] = useState({})
  const token = localStorage.getItem("jwt")

  useEffect(()=>{
    fetch(`users/${user.id}`, {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    ).then(
        r => r.json()
    ).then(
        data => setProfile(data)
    )
  },[])

  return (
    <Card>
      <Card.Header>
        <h3>Personal Information</h3>
      </Card.Header>
      <Card.Body>
        <h4>Username: {profile.username}</h4>
        <p>Email: {profile.email}</p>
        <p>Phone: {profile.phone}</p>
        <p>Role: {profile.role}</p>
      </Card.Body>

    </Card>
  )
}
