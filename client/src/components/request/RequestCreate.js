import React, { useEffect, useState } from 'react'
import RequestForm from './RequestForm'

export default function RequestCreate({handleSubmit}) {
        const [request, setRequest] = useState({})
         const [isSubmitted, setIsSubmitted] = useState(false)
            useEffect(()=>{
                isSubmitted && handleSubmit('/requests', "POST", request)
            },[isSubmitted, request, handleSubmit])
    return (<div className='displayDiv'>
<RequestForm setRequest={setRequest} setIsSubmitted={setIsSubmitted}/>
    </div>)
    
     
}
