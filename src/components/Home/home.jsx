import { useState, useEffect } from "react";
import { addFlats } from "../../Redux/Flats/action.js";
import { addResidents } from "../../Redux/Residents/action.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import CircularIndeterminate from "./spinners";
import { Navigate } from "react-router-dom";


export const Home = () => {
  const { flats } = useSelector((store) => store.flats);
  const [flatData, setflatData] = useState([]);

  const [loading, setloading] = useState(false);
  const { isLogged } = useSelector((store) => store.admin);

  const dispatch = useDispatch();

  const getFlatsData = () => {
    setloading(true);
    fetch("https://apartmentsbackend.herokuapp.com/flats")
      .then((res) => res.json())
      .then((data) => {
        dispatch(addFlats(data));
        setflatData([...data]);
        setloading(false);
      });
  };

  const getclassData = () => {
    fetch("https://apartmentsbackend.herokuapp.com/residents")
      .then((res) => res.json())
      .then((data) => dispatch(addResidents(data)));
  };

  useEffect(() => {
    getFlatsData();
    getclassData();
  }, []);

  const handleFiltering = (e) => {
    let value = e.target.value;
    let sub = flats.filter((e) => e.resident_type === value);
    setflatData([...sub]);
  };

  const handleSorting = (e) => {
    let value = e.target.value;
    if(value === "asc"){
      let sub = flats.sort((a , b) => ((+a.flat_no) - (+b.flat_no)));
      setflatData([...sub]);
    }else{
      let sub = flats.sort((a , b) => ((+b.flat_no) - (+a.flat_no)));
      setflatData([...sub]);
    }
  }

  const handleDelete = (id) => {
    fetch(`https://apartmentsbackend.herokuapp.com/flats/${id}`, {
      method: "DELETE"
    }).then(alert("Proceed to Delete?"))
    .then(getFlatsData())
  }

  if (!isLogged) {
    return <Navigate to={"/signup-login/"}></Navigate>;
  }

  return loading ? (
    <CircularIndeterminate />
  ) : (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "55%",
          margin: "auto",
        }}
      >
        <label
          style={{
            
           
          
          }}
          htmlFor=""
        >
          <strong>Filter Resident</strong>
        </label>
        <select
          style={{ margin: "2% auto", height: "35px" }}
          onChange={handleFiltering}
          name=""
          id=""
        >
          <option value="--">Select Residnet Type</option>
          <option value="rent">Rent</option>
          <option value="own">Own</option>
        </select>
        
        <label
          style={{
            margin: "2% auto",
            height: "35px",
          
            
            color: "black",
            fontWeight: "600",
            borderRadius: "6px",
            padding: "5px",
          }}
          htmlFor=""
        >
          <strong>Sort By Flat No</strong>
        </label>
        <select
          style={{ margin: "2% auto", height: "35px" }}
          onChange={handleSorting}
          name=""
          id=""
        >
          <option value="--">Select Order For Sorting</option>
          <option value="ascending order">low to high</option>
          <option value="descending order">high to low</option>
        </select>
      </div>
      <Table
        
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Flat Name</th>
            <th>Total Residents</th>
            <th>Flat number</th>
            <th>Block Name</th>
            <th>Type of Residents</th>
            <th>Flat Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody >
          {flatData.map((e) => (
            <tr key={e._id}>
              <td>
                <Link
                  style={{ color: "black"}}
                  to={`/residents/${e._id}/`}
                >
                  {e._id}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.flat_name}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.total_residents}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.flat_no}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.block_name}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.resident_type}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  <img
                    style={{
                      width: "200px",
                      height: "100px",
                      
                    }}
                    src={e.flat_img}
                    alt=""
                  />
                </Link>
              </td>
              <td>
                <Button
                  style={{
                    backgroundColor: "teal",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "black",
                    fontWeight: "500",
                  }}
                  onClick = {() => {handleDelete(e._id)}}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </>
  );
};
