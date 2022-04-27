import { useState, useEffect } from "react";
import { addFlats } from "../../Redux/Flats/action.js";
import { addResidents } from "../../Redux/Residents/action.js";
import { sortAsc ,  sortDsc } from "../../Redux/Flats/action.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import CircularIndeterminate from "./spinners";
import { Navigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

export const Home = () => {
  const { flats } = useSelector((store) => store.flats);
  const [flatData, setflatData] = useState([]);

  const [loading, setloading] = useState(false);
  const { isLogged } = useSelector((store) => store.admin);

  const dispatch = useDispatch();

  const getFlatsData = () => {
    setloading(true);
    fetch("https://prem-deployment.herokuapp.com/flats")
      .then((res) => res.json())
      .then((data) => {
        dispatch(addFlats(data));
        setflatData([...data]);
        setloading(false);
      });
  };

  const getclassData = () => {
    fetch("https://prem-deployment.herokuapp.com/residents")
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
    fetch(`https://prem-deployment.herokuapp.com/flats/${id}`, {
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
            margin: "2% auto",
            height: "35px",
            border: "1px solid lightblue",
            backgroundColor: "blue",
            color: "white",
            fontWeight: "600",
            borderRadius: "6px",
            padding: "5px",
          }}
          htmlFor=""
        >
          <strong>Filter By Resident Type</strong>
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
            border: "1px solid lightblue",
            backgroundColor: "blue",
            color: "white",
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
          <option value="asc">low to high</option>
          <option value="des">high to low</option>
        </select>
      </div>
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ width: "80%", margin: "0.5% auto"}}
      >
        <thead>
          <tr>
            <th>#ID</th>
            <th>Flat Name</th>
            <th>Total No of Residents</th>
            <th>Flat No</th>
            <th>Block Name</th>
            <th>Resident Type</th>
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
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e._id}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.flat_name}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.total_residents}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.flat_no}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.block_name}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  {e.resident_type}
                </Link>
              </td>
              <td>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/residents/${e._id}/`}
                >
                  <img
                    style={{
                      width: "200px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={e.flat_img}
                    alt=""
                  />
                </Link>
              </td>
              <td>
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "600",
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
