import React from 'react'
import useQuery from '../../hooks/useQuery'

export default function IncidentList() {
  const {data: incidents,isLoaded} = useQuery({url:"/requests", method:"GET"})
  return (
    <ul>{
      isLoaded ? console.log(incidents) :<>"No incident reported yet"</> 
      }</ul>
  )
}
