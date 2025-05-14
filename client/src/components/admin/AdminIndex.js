import React, { useEffect } from 'react'
import SideBar from '../navigation/SideBar'
import { Route, Routes } from 'react-router-dom'
import AnalyticsDashboard from './AnalyticsDashboard'
import UsersDashboard from './UsersDashboard'
import SystemLogs from './SystemLogs'

export default function AdminIndex({user, authorized_user}) {
  const links = [{
    url: 'admin/users_dashboard',
    label: "Users Dashboard",
  },{
url:"admin/system_logs" ,
    label:"System Logs" ,
  },{
url: "admin/analytics_dashboad ",
    label:"Analytics Dashboard" ,
  }

]
    useEffect(()=>{
       if (user) authorized_user('admin', user.role) 
    },[user, authorized_user])
  return (
    <div className='innerDiv'>
      <SideBar links={links}/>
      <div>
        <Routes>
          <Route path='/analytics_dashboard' element={<AnalyticsDashboard/>}/>
          <Route path='/users_dashboard' element={<UsersDashboard/>}/>
          <Route path='/system_logs' element={<SystemLogs/>}/>
        </Routes>
      </div>
    </div>
  )
}
