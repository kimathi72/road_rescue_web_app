import React from 'react'
import useQuery from '../../hooks/useQuery'
import RequestsList from './RequestsList'
import { fetchData } from '../../services/fetchData'
import { useLoaderData } from 'react-router-dom'

export async function loader (userId){
  const requests = await fetchData({
    url: `/api/users/${userId}/requests`,
    method: "GET"
  })
  return {requests}
}

export default function RequestQueue() {
  const {requests} = useLoaderData()
  const title = "Requests Queue"
  return (
    !!requests ? <RequestsList title={title} requests={requests}/> : <p>Fetching Your Requests. . .</p>
  )
}
