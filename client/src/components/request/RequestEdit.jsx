import React from 'react'

export default function RequestEdit() {
  return (
    <div className='displayDiv'>
            <h3 className='pageTitle'>Edit Rescue Request</h3>
    <RequestForm setRequest={setRequest} handleSubmit={handleSubmit}/>
        </div>
  )
}
