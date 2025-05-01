import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import AutoComplete from './AutoComplete'
import RequestPreview from './RequestPreview'


export default function RequestForm({user}) {
  const [request, setRequest]= useState({})
  const token = localStorage.getItem('jwt')
  useEffect(()=>{
    user && setRequest(prev=>({...prev, "driver_id": user.id}))
  },[user])
    const handleChange= (e) =>{
        setRequest(prev => ({...prev, [e.target.name]: e.target.value}))
    } 
    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(request)
      try{
        const res = await fetch('/requests',{
          method: "POST",
          header: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"request": request })
        })
        const data = await res.json()
        console.log(data)
        return <RequestPreview request={request}/>
      }catch(error){console.error(error)}
     
    }   
  return (
    <Form onSubmit={handleSubmit} className='flex flex-column gap-5 m-2 p-2 ' >
        <h1>Report New Incident</h1>
       <div className='flex flex-row justify-content-between m-2 p-2'>
        <div className='col-4'>
        <AutoComplete lb={"Location"} callBackFn={(value)=>{setRequest(prev=>({...prev, 'location_id': value}))}} url={'/locations'} k={'city'} />
        </div>
        <div className='col-4'>
          <AutoComplete lb={"Service Type"} url={'/services'} k={'name'} callBackFn={(value)=>{setRequest(prev=>({...prev, 'service_id': value}))}} /></div>
        </div> 
      
      
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
