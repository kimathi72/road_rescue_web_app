import React from 'react'
import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'

export default function RequestQueue({user}) {
  const {data: requests, isLoaded} = useQuery(`/users/${!!user && user.id}/requests`)
  const title = "Requests Queue"
  return (
    isLoaded ? <RequestsList title={title} requests={requests}/> : <p>Fetching Your Requests. . .</p>
  )
}
