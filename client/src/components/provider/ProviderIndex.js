import React, {useState, useEffect} from 'react'
import useQuery from '../../hooks/useQuery'
import { Link, Route, Routes} from 'react-router-dom'
// import { CableContext } from "../../context/cable";
import ProviderDashboard from './ProviderDashboard';
import IncidentsQueue from './IncidentsQueue';
import RescueRequestDetails from './RescueRequestDetails';
import InvoiceSubmission from './InvoiceSubmission';


export default function ProviderIndex({user, authorized_user}) {
    const {data: results, isLoaded} = useQuery(`/rescue_providers/${user.id}`)
    const [incidentsQueue, setIncidentsQueue] = useState(null);
    // const cableContext = useContext(CableContext);
    useEffect(() => {
      authorized_user('rescue_provider', user.role)
      if (isLoaded) {
        setIncidentsQueue(results['incidents_queue']);
      }
    }, [isLoaded,results, user, authorized_user]);
    // useEffect(() => {
    //  const newChannel = cableContext.cable.subscriptions.create(
    //     {
    //       channel: "RequestChannel",
    //     },
    //     {
    //       // remember, the data being received and passed to the received
    //       // callback is an object structured like this:
    //       // { message: "some message" }
    //       // connected: (message)=> console.log(message),
    //       received: (data) => {
    //         setIncidents([...incidents, data['request']])},
    //     }
    //   );
    //   console.log(newChannel)
    // }, [cableContext, requests]);
  return (
    <div className='displayDiv'>
          <div className='sideBar'>
            <Link to={'/provider/dashboard'}>Dashboard</Link>
            <Link to={'/provider/incident_reporting'}>Incident Reporting</Link>
            <Link to={'/provider/claims_tracking'}>Claims Tracking</Link>
            <Link to={'/provider/vehicle_list'}>Vehicles List</Link>
          </div><Routes>
                <Route path='/incidents_queue' element={<IncidentsQueue incidentsQueue={incidentsQueue} />}/>
                <Route path='/' exact element={<ProviderDashboard incidentsQueue={incidentsQueue} />}/>
                <Route path='/dashboard' element={<ProviderDashboard incidentsQueue={incidentsQueue}/>}/>
                <Route path='/rescue_request_details' element={<RescueRequestDetails incidentsQueue={incidentsQueue} />}/>
                <Route path='/invoice_submission' element={<InvoiceSubmission incidentsQueue={incidentsQueue} />}/>
                
                
            </Routes> : <p>Loading Dashboard</p>
        }
    </div>
  )
}
