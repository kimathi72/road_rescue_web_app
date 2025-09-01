import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
export default function ProviderNav() {
    const links = [
        {
            url: '/',
            text: 'Home',
            icon: <HomeIcon/>
        },{
            url: '/requests',text:'Open Requests',icon: <RequestPageIcon/>
        },{
            url: '/requests/queue',text: "My Jobs",icon: <WorkHistoryIcon/> 
        },{
            url: '/earnings',text: "Earnings",icon: <PaidIcon/>
        },{
            url: '/profile',text:'Profile',icon: <AccountBoxIcon/>
        },
    ]
  return (
    <>{
        links.map(link=>{
          return  <li key={link.text}>
                <NavLink to={link.url}>
                    <Button color='default' startIcon={link.icon}>{link.text}</Button>
                </NavLink>
            </li>
        })
    }</>
  )
}
