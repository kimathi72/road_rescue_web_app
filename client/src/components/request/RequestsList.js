import React from 'react'
import useQuery from '../../hooks/useQuery'
import TableCustomized from '../util/TableCustomized'
import { Stack } from '@mui/material'


export default function RequestsList() {
  const {data: requests, isLoaded} = useQuery('/requests')

  return (
    <Stack direction={'column'} textAlign={'center'}>
      <h3>Queued Requests</h3>
    {
      isLoaded && requests.length > 0 ? <TableCustomized rows={requests}/> : <p>No Rescue Requests found.</p>
      }</Stack>
  )
}
