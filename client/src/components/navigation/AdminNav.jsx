import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import SummarizeIcon from '@mui/icons-material/Summarize';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
export default function AdminNav() {
    const links = [
        {
            url: '/',
            text: 'Dashboard',
            icon: <DashboardIcon/>    
        },{
            url: '/users',
            text: 'Manage Users',
            icon: <GroupIcon/>    
        },{
            url: '/requests' ,
            text: 'Manage Requests', 
            icon: <RequestPageIcon/>
        },{
            url: '/reports',
            text: 'Reports',  
            icon: <SummarizeIcon/>  
        },{
            url: '/settings',
            text: "Settings",
            icon: <SettingsIcon/>
        }

    ]
  return (
    <>
    {
        links.map((link)=>{
          return  <li key={link.text}>
            <NavLink to={link.url}>
                <Button startIcon={link.icon}>{link.text}</Button>
            </NavLink>
            </li>
        })
    }
    </>
  )
}
