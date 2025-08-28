import React from 'react'
import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'

export default function RequestIndex() {
  const {data: requests, isLoaded} = useQuery('/requests')
  const title = "Requests List"
  return (
    isLoaded ? <RequestsList title={title} requests={requests.filter(request=>request.status === "reported")}/> : <p>Fetching Rescue Requests. . .</p>
  )
}
