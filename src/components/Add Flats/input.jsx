
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from "react"
import Button from '@mui/material/Button';

export default function BasicTextFields() {
    const [flatData, setflatData] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setflatData({
            ...flatData,
            [name]: value.toLowerCase()
        })
        console.log(flatData);
    }

    const handlePost = () => {
        fetch("https://apartmentsbackend.herokuapp.com/flats/", {
          method: "POST",
          body: JSON.stringify({...flatData}),
          headers: {
            "content-type": "application/json"
          }
        }).then(alert("Data added successfully"))
        .then(setflatData({}));
    }
  return (
      <>
    <Box style = {{margin: "2% auto"}}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange = {handleChange} name = "flat_name" id="outlined-basic" label="Enter flat Name" variant="outlined" />
      <TextField onChange = {handleChange} name = "resident_type" id="filled-basic" label="Enter Resident Type" variant="filled" />
      <TextField onChange = {handleChange} name = "total_residents" id="standard-basic" label="Enter Total No Of Residents" variant="standard" />
    </Box>
    <Box style = {{margin: "2% auto"}}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange = {handleChange} name = "flat_no" id="outlined-basic" label="Enter Flat No" variant="outlined" required/>
      <TextField onChange = {handleChange} name = "block_name" id="filled-basic" label="Enter Block Name" variant="filled" required/>
      <TextField onChange = {handleChange} name = "flat_img" id="standard-basic" label="Add Image Address" variant="standard" required/>
      <br />
      <Button onClick = {handlePost} variant="contained" >Add</Button>
    </Box>
    </>
  );
}


