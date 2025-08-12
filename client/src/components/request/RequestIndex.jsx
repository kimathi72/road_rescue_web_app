import React from 'react'
import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'

export default function RequestIndex() {
  const {data: requests, isLoaded} = useQuery('/requests')
  return (
    isLoaded ? <RequestsList requests={requests}/> : <p>Fetching Rescue Requests. . .</p>
  )
}
