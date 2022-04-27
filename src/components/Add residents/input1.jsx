


import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState, useEffect} from "react"
import Button from '@mui/material/Button';

export default function BasicTextFields() {
     const [residentData, setresidentData] = useState({});

     const handleChange = (e) => {
         const {name, value} = e.target;
         setresidentData({
             ...residentData,
             [name] : value
         })
         console.log(residentData);
     }

     const handlePost = () => {
        fetch("https://prem-deployment.herokuapp.com/residents/", {
            method: "POST",
            body: JSON.stringify({...residentData}),
            headers: {
              "content-type": "application/json"
            }
          }).then(alert("Data added successfully"))
          .then(setresidentData({}));
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
      <TextField  onChange = {handleChange} name = "name" id="outlined-basic" label="Enter Name" variant="outlined" />
      {/* <TextField name = "gender" id="filled-basic" label="Enter Gender" variant="filled" /> */}
      <select onChange = {handleChange} style ={{height: "35px"}} name="gender" id="gender">
          <option value="---">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          </select>
      <TextField  onChange = {handleChange} name = "age" id="standard-basic" label="Enter Age" variant="standard" />
      <TextField  onChange = {handleChange} name = "flat_id" id="standard-basic" label="Enter Flat ID" variant="standard" />
      <br />
      <Button onClick = {handlePost} variant="contained" color="success">Add Data</Button>
    </Box>
    </>
  );
}


/*
"name": "Premkumar Hulikoppe",
        "gender": "male",
        "age": 25,
        "flat_id": "625beb39db4cc2680352d69f",
*/