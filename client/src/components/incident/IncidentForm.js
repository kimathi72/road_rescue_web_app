import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import useQuery from '../../hooks/useQuery'
import IncidentLocation from './IncidentLocation'


export default function IncidentForm({handleSubmit, setIncidentData}) {
const {data: emergencyTypes, isLoaded} = useQuery({url:"/services", method: "GET"})



    const handleChange= (e) =>{
        setIncidentData(prev => ({...prev, [e.target.name]: e.target.value}))
    }


    
  return (
    <Form onSubmit={handleSubmit} className='' >
        <h1>Report New Incident</h1>
        <Form.Group>
            <Form.Select onChange={handleChange}>
                <option>choose type of emergency service</option>
                {isLoaded && emergencyTypes.map((emergencyType,index) => {
                return    <option key={index} value={emergencyType.id}>{emergencyType.name}</option>
            
                })}
            </Form.Select>
        </Form.Group>
      <IncidentLocation/>
        <Form.Group>
            <Form.Label>
                Description:
            </Form.Label>
            <Form.Control as="textarea" name='request_description' onChange={handleChange} rows={3} placeholder="Enter description" />
        </Form.Group>
        <Button type="submit">submit</Button>
    </Form>
  )
}
