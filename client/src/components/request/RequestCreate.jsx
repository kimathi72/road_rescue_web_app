import React, { useEffect, useState } from 'react'
import RequestForm from './RequestForm'
import { useNavigate } from 'react-router-dom'

export default function RequestCreate() {
        const [request, setRequest] = useState({})
        const token = localStorage.getItem('jwt')
        const navigate = useNavigate()

        const handleSubmit = async (e) => {
            e.preventDefault() 
            console.log(request)
      const results = await fetch('/api/requests', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"request":request}),
      });
      const data = await results.json();
      // setRequest(data)
      console.log(data);   

      navigate(`/request/${data.id}`)
  };
    return (
    <div className='displayDiv'>
        <h3 className='pageTitle'>Create New Rescue Request</h3>
<RequestForm setRequest={setRequest} handleSubmit={handleSubmit}/>
    </div>)
    
     
}
