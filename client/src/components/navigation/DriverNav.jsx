import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PaidIcon from '@mui/icons-material/Paid';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
export default function DriverNav() {
    const links = [
        {url:'/requests/create',text: "Request Rescue",icon: <LibraryAddIcon/> },
        {url: '/requests/queue',text: "My Requests",icon: <WorkHistoryIcon/> },
        {url: '/vehicles', text: "My vehicles", icon: <DirectionsCarIcon/>},
        {url: '/reports',text: "Reports",icon: <SummarizeIcon/>},
        {url: '/invoices',text: "Invoices",icon: <PaidIcon/> },
    ]
  return (
    <>
    {
        links.map(link => {
          return  <li key={link.text}>
                <NavLink to={link.url}
                className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
>
                    <Button fullWidth color='warning' variant='contained' size='small' startIcon={link.icon}>{link.text}</Button>
                </NavLink>
            </li>
        })
    }</>
  )
}
