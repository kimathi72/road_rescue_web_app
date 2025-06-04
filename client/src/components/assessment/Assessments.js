import React, { useEffect, useState }  from 'react'
import TableCustomized from '../util/TableCustomized'
import {Stack , Button} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation } from 'react-router-dom'
export default function Assessments({user,assessments, isLoaded}) {
   const [tableContent, setTableContent] = useState([])
    const location = useLocation()
    const {pathname} = location
    useEffect(()=>{
        isLoaded && setTableContent(assessments.map(assessment=>{
          const {user, claim, ...rest} = assessment
           return {...rest,claim: claim.id, actions: <Stack direction={'row'} spacing={1}>
    <Button href={`${pathname}/${assessment.id}`} color={'info'} startIcon={<VisibilityIcon/>}>view</Button>
           </Stack>}
        }))
      },[assessments,pathname,isLoaded])
  return (
     <Stack direction={'column'} textAlign={'center'} >
      <Stack direction={'column'}>
        <h3 style={{ textAlign: "center", color: "green" }}> Assessments</h3>
        {(user.role === 'insurer' || user.role=== 'assessor') && <Button href={`/${pathname}/create`} color={'success'} startIcon={<VisibilityIcon/>}>Add Assessment</Button>}
        </Stack>
        {
          isLoaded ? tableContent.length > 0 ? <TableCustomized rows={tableContent}/> : <p>No Assessment found</p> : <p>fetching incidents</p>
        }
        
    </Stack>
  )
}
