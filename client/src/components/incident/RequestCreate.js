import React from 'react'
import useQuery from '../../hooks/useQuery'
import RequestPreview from './RequestPreview'

export default function RequestCreate({request}) {
    const {data: result, isLoaded } = useQuery({url: '/requests', method: "POST", body: {"request": request}})
        
    return (<>
{(isLoaded) ? <RequestPreview request={result}/> : <p>Creating request.</p>  }
    </>)
    
     
}
