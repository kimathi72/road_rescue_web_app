import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar({links}) {
  return (
    <div className='sideBar'>
        {links.map((link, index)=>{
            return <Link key={index}  to={link['url']}>{link['label']}</Link>
        })}
    </div>
  )
}
