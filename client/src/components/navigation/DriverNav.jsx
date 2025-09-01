import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PaidIcon from '@mui/icons-material/Paid';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
export default function DriverNav() {
    const links = [
        {url: '/',text: "Home",icon: <HomeIcon/>},
        {url:'/requests/create',text: "Request Rescue",icon: <LibraryAddIcon/> },
        {url: '/requests/queue',text: "My Requests",icon: <WorkHistoryIcon/> },
        {url: '/payments',text: "Payments",icon: <PaidIcon/> },
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
                    <Button color='default' size='small' startIcon={link.icon}>{link.text}</Button>
                </NavLink>
            </li>
        })
    }</>
  )
}
