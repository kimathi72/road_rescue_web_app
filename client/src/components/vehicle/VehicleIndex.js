import React, { useEffect, useState }  from 'react'
import VehicleList from './VehicleList'
import VehicleCreate from './VehicleCreate'

export default function VehicleIndex({user, handleSubmit}) {
    const [vehicle,setVehicle] = useState({})
      const [isSubmitted, setIsSubmitted] = useState(false)
      useEffect(()=>{
        console.log(vehicle)
        isSubmitted && handleSubmit('/vehicles', "POST", {"vehicle":vehicle})
      },[isSubmitted, handleSubmit, vehicle])
  return (
    <div>
        <VehicleCreate driver={user} setIsSubmitted={setIsSubmitted} setVehicle={setVehicle}/>
        <VehicleList vehicles={user.vehicles}/>        
    </div>
  )
}
