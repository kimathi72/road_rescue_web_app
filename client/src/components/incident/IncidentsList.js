import React from "react";

export default function IncidentsList({incidents}) {

  return (
    <ul>
     {   incidents.map((incident, index) => {
          return <li key={index}>{incident.id}</li>;
        })
     }
    </ul>
  );
}
