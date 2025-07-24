import React, { useEffect } from 'react'
import useQuery from '../../hooks/useQuery'

export default function Index() {
  const {data: users, isLoaded} = useQuery('/users')
  useEffect(()=>{
    console.log(users)
  },[users])
  return (
    <div>Index</div>
  )
}
