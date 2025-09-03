import React from 'react'
import { fetchData } from '../../services/fetchData'
import { Form, useLoaderData } from 'react-router-dom'
import { Button, Grid, MenuItem, TextField } from '@mui/material'
import MapPicker from '../location/MapPicker.jsx'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export async function loader (userId){
  const services = await fetchData({
    url: '/api/services',
    method: "GET"
  })
  const vehicles = await fetchData({
    url: `/api/drivers/${userId}}/vehicles/`,
    method: "GET"
  })
  return {services, vehicles}
}
export async function action({request}){
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  updates['location_attributes'] = JSON.parse(updates['location_attributes'])
  const data = await fetchData({
    url: '/api/requests', 
    method: "POST", 
    submittedData: {"request": updates}
  })
  console.log(data)
}

export default function RequestCreate() {
  const {services, vehicles} = useLoaderData()
  
  useDocumentTitle('Road Rescue - Create Request ')
  return (
    <Grid container size={{xs:12, md:12, lg:8}} direction={'column'} alignItems={'center'} gap={'2rem'}>
      <h1>Create Rescue Request</h1>
      <Form method='post' id='requestForm'>
        <div>
          <label className="block text-sm font-medium">Pickup Location</label>
          <MapPicker/>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:"0.5rem", background: "#f9ebeb", padding: '5px', borderRadius: "0.3rem"}}>
          <label className="block text-sm font-medium">What's the problem?</label>
          <TextField
          select
          variant='standard'
          defaultValue={1}
          helperText="please select the service needed"
          name='service_id'
          >
          {
            services.map((service, index)=>{
              return <MenuItem key={index} value={service.id}> {service.name}</MenuItem>
            })
          }</TextField>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:"0.5rem", background: "#f9ebeb", padding: '5px', borderRadius: "0.2rem"}}>
          <label className="block text-sm font-medium">Vehicle Details</label>
          <TextField
          select
          variant='standard'
          defaultValue={1}
          helperText="please select from vehicles list above "
          name='vehicle_id'
          >
          {
            vehicles.map((vehicle, index)=>{
              return <MenuItem key={index} value={vehicle.id}> {vehicle['plate_number']}</MenuItem>
            })
          }</TextField>
        </div>
          <div style={{display:"flex", flexDirection:"column", gap:"0.5rem", background: "#f9ebeb", padding: '5px', borderRadius: "0.3rem"}}>
            <label>Additional Information</label>
            <TextField
            sx={{background:"white"}}
            name='request_description'
            multiline 
            minRows={2}
            />
          </div>
        <Button fullWidth color='warning' variant='contained' type='submit'>Submit Request</Button>
      </Form>

    </Grid>
  )
}









// import React, { useEffect, useState } from 'react'
// import RequestForm from './RequestForm'
// import { useNavigate } from 'react-router-dom'

// export default function RequestCreate() {
//         const [request, setRequest] = useState({})
//         const token = localStorage.getItem('jwt')
//         const navigate = useNavigate()
//         useEffect(()=>{console.log(request)},[request])

//         const handleSubmit = async (e) => {
//             e.preventDefault() 
//             console.log(request)
//       const results = await fetch('/api/requests', {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({"request":request}),
//       });
//       const data = await results.json();
//       // setRequest(data)
//       console.log(data);   

//       navigate(`/requests/${data.id}`)
//   };
//     return (
//     <div className='displayDiv'>
//         <h3 className='pageTitle'>Create New Rescue Request</h3>
// <RequestForm setRequest={setRequest} handleSubmit={handleSubmit}/>
//     </div>)
    
     
// }
