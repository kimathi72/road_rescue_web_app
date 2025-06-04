import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UsersList from '../user/UsersList'
import useQuery from '../../hooks/useQuery'

export default function UsersDashboard() {
  const {data: users, isLoaded} = useQuery('/users')
  return (
    <div>
      <h3>User Management</h3>
      <Routes>
        <Route path='/' exact element={isLoaded && <UsersList users={users}/>}/>
      </Routes>
    </div>
  )
}
