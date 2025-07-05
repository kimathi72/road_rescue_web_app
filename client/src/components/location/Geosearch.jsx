import React, { useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch'; 
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Box} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
export default function Geosearch({handleOpen, setPosition, value, setValue}) {
    const [results,setResults] = useState(null)
    const provider = new OpenStreetMapProvider();
    const handleClick = (result)=>{
        console.log(result)
        const {x, y, ...rest} = result
        setPosition([y,x])
        setValue(result.label)
        setResults(null)
    } 
    const handleChange = async(e)=>{
      setValue(e.target.value)
        const data = await provider.search({query: e.target.value})
        setResults(data)
    }       
  return (
    <FormControl fullWidth>
         <InputLabel htmlFor="outlined-adornment-location">Enter Address</InputLabel>
       <OutlinedInput
       id="outlined-adornment-location"
       endAdornment={ !!(value.length > 0) &&
        <InputAdornment position="end">
          <IconButton
          edge="end"
          onClick={()=>{
            setValue('')
            setResults(null)
            setPosition(null)
          }}
          >
<ClearIcon/>
          </IconButton>
        </InputAdornment>
       }
       label='Enter Address'
       value = {value}
       onChange={handleChange}
       ></OutlinedInput>
       {!!results && <ul className='listSelect' style={{width: '100%', 
        padding: 5, 
        listStyle: "none", 
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
       {
         results.map((result,index) => {
            
            return <li onClick={()=>handleClick(result)} key={index}>{result.label}</li>
        })
       }
       </ul>}
    </FormControl>
  )
}
