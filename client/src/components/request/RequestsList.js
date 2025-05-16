import React from 'react'


export default function RequestsList({requests}) {
  
  return (
    <ul>{
      requests.length ? requests.map((request, index)=>{
      return   <li key={index}>
          {request.id}
        </li>
      }) : <li>No Rescue Requests found.</li>
      }</ul>
  )
}
