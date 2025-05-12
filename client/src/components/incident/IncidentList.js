import React from 'react'
import IncidentPreview from './IncidentPreview'

export default function IncidentList({incidents}) {
  return (
    <div>
        <h2>Reported Incidents</h2>
        {
            incidents && incidents.length ? incidents.map((incident,index) => {
                return <IncidentPreview key={index} incident={incident}/>
            } ) : <p>No incident reported yet</p>
        }
    </div>
  )
}
