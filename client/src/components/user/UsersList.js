import React, { useEffect, useState } from 'react'
import TableCustomized from '../util/TableCustomized'
import { Button, Stack } from '@mui/material'

export default function UsersList({users}) {
    const [tableContent, setTableContent] = useState([])
    useEffect(()=>{
        users.length > 0 && setTableContent(users.map((user)=>{
            const {vehicles, incidents, claims, requests, notifications, ...rest} = user
            return {...rest, actions: <Stack>
                <Button>Assign Role</Button>
            </Stack>}
            }) )
    },[users])
  return (
    <div>Users List
        {
            tableContent.length > 0 && <TableCustomized rows={tableContent}/>
        }
    </div>
  )
}
