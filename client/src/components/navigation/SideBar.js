import { List, ListItem, ListItemIcon, } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar({links}) {
  return (
    <div className='sideBar'>
      <List>
        {links.map((link, index)=>{
          return <ListItem key={index}> 
           <ListItemIcon>
          {link.icon}
            </ListItemIcon>
             <Link key={index}  to={link['url']}>{link['label']}</Link>
      
        </ListItem>
        }
        )}
        </List>
    </div>
  )
}