import React from 'react'
import Alert from '@mui/material/Alert'


export default function Notify(props) {
  return (
    <Alert severity={props.severity} sx={{display:'flex', flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1 rem", margin:"1em"}}>
        <p sx={{margin: "1em" }}>{props.message}</p>
        <div sx={{display: "flex", textAlign: "center"}}>{props.children}</div>
    </Alert>
  )
}
