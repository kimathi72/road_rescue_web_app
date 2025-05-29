import { Stack } from '@mui/material'
import useQuery from '../../hooks/useQuery'
import TableCustomized from '../util/TableCustomized'

export default function ClaimsList() {
  const {data: claims, isLoaded} = useQuery('/claims')
 
  return (
    <Stack direction={'column'} justifyContent={'space-around'} textAlign={'center'}> 
      <h3 style={{ textAlign: "center", color: "green" }}>Claims Tracking</h3>
      {
      isLoaded ? claims.length > 0 ? <TableCustomized rows={claims}/> : <p>No claims initiated yet</p> : <p>fetching claims</p>
      }</Stack>
  )
}
