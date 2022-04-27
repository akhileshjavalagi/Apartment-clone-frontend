import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'
import Button from '@mui/material/Button';
import CircularIndeterminate from "../Home/spinners"

export const Residents = () => {
  const { residents } = useSelector((store) => store.residents);
  const [allResidents, setallResidents] = useState([]);
  var { flat_id } = useParams();
  const [loading, setloading] = useState(false);

  function filterData(data, flat_id){
      let res = data.filter((e) => (e.flat_id === flat_id));
      setallResidents([...res]);
      console.log(res);
      setloading(false);
  }

  const filterResidents = (flat_id) => {
    // console.log("id is " ,flat_id);
    setloading(true);
    fetch(`https://prem-deployment.herokuapp.com/residents/`)
      .then((res) => res.json())
      .then((data) => {filterData(data, flat_id)});
  };

  const handleDelete = (id) => {
    fetch(`https://prem-deployment.herokuapp.com/residents/${id}`, {
      method: "DELETE"
    })
    .then(alert("Proceed to delete?"))
    .then(filterResidents(flat_id))
  }

  useEffect(() => {
    filterResidents(flat_id);
  }, []);

  return loading ?  <CircularIndeterminate /> : (
    <>
    <Table style= {{width: "80%", margin: "2% auto"}} striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#ID</th>
      <th>ResidentName</th>
      <th>Gender</th>
      <th>Age</th>
      <th>Flat ID</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
      {allResidents.map((e) => (
    <tr key = {e._id}>
      <td>{e._id}</td>
      <td>{e.name}</td>
      <td>{e.gender}</td>
      <td>{e.age}</td>
      <td>{e.flat_id}</td>
      <td><Button style={{backgroundColor: "green", color: "white", fontWeight: "600"}}>Edit</Button></td>
      <td><Button onClick = {() => {handleDelete(e._id)}} style={{backgroundColor: "red", color: "white", fontWeight: "600"}}>Delete</Button></td>
    </tr>
      ))}
   
  </tbody>
</Table>
    </>
  );
};
