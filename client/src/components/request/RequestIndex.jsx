import React from 'react'
import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'

export default function RequestIndex({user}) {
  const {data: requests, isLoaded} = useQuery('/requests')
  const title = "Requests List"
  return (
    isLoaded && !!user ? <RequestsList title={title} requests={requests.filter(request=>request.status === "reported" && request.location.city === user.location.city)}/> : <p>Fetching Rescue Requests. . .</p>
  )
}
