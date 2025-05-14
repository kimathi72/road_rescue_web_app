import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function VehicleList({vehicles}) {
  return (
    <div>

        <h2>Vehicles List</h2>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vehicle Plate Number</TableCell>
            <TableCell align="right">Make</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">Year</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          { vehicles ? vehicles.map((vehicle,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {vehicle['plate_number']}
              </TableCell>
              <TableCell align="right">{vehicle['make']}</TableCell>
              <TableCell align="right">{vehicle['model']}</TableCell>
              <TableCell align="right">{vehicle['year']}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          )) : <TableRow>
            <TableCell align="center">No vehicles added yet</TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}
