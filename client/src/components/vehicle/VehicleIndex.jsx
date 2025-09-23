import VehicleList from './VehicleList'
import VehicleCreate from './VehicleCreate'
import { Route, Routes, useLoaderData} from 'react-router-dom'
import {Grid} from '@mui/material'
import { fetchData } from '../../services/fetchData'

export async function loader ({params}){
  const {user} = await fetchData({
    url: '/api/me',
    method: "GET"
  })
  const vehicles = await fetchData({
    url: `/api/drivers/${!!user && user.id}/vehicles`,
    method: "GET"
  })
  return {vehicles, user}
}
export async function action ({request}){
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const data = fetchData({
    url: '/api/vehicles',
    method: "POST",
    submittedData: {'vehicle': updates}
  })
  !!data.error ? window.location.reload() : console.log(data.error)
  !!data && window.location.reload()
}

export default function VehicleIndex() {
    const {vehicles, user} = useLoaderData()
  return (
    <Grid container direction={'column'}>
      <VehicleCreate user={user}/>
      <VehicleList vehicles={vehicles}/>
                     
    </Grid>
  )
}
