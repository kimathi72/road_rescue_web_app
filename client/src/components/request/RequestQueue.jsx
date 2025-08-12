import React from 'react'
import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'

export default function RequestIndex({user}) {
  const {data: requests, isLoaded} = useQuery(`/requests/${!!user && user.id}`)
  return (
    isLoaded ? <RequestsList requests={requests}/> : <p>Fetching Your Requests. . .</p>
  )
}
