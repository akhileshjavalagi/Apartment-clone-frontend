import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import CircularIndeterminate from "../Home/spinners"
import {addAdmin} from "../../Redux/Admin/action.js"



// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function Signup() {
  const [user, setuser] = useState({});
  const [show, setshow] = useState(false);
  const dispatch = useDispatch();
  const {adminData} = useSelector((store) => store.admin);
  const [ count, setcount] = useState(false);
  console.log(adminData);

  const getAdmins = () => {
    fetch("https://prem-deployment.herokuapp.com/admin")
    .then((res) => res.json())
    .then((data) => dispatch(addAdmin(data)));
  }

  useEffect(() => {
    getAdmins();
  
  }, [])
  


  const handleChange = (e) => {
    const {name, value} = e.target;
    setuser({
      ...user,
      [name] : value
    });
    console.log(user);
  }
    const handleSubmit = (e) => {
      e.preventDefault();
      adminData.map((e) => {
        if(e.name == user.user_name){
          setcount(true);
        }
      })
      if(count) {
        alert("User has already Signedup") 
      }
      else {
        fetch("https://prem-deployment.herokuapp.com/admin", {
          method: "POST",
          body: JSON.stringify({...user}),
          headers: {
            "content-type": "application/json"
          }
        }).then(setuser({}))
        .then(alert("User Signedup Successfully"));
      }
    }
      
      return (
        <Card sx={{ maxWidth: 400}} >
      <Form onSubmit = {handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label >Email address</Form.Label>
          <Form.Control onChange = {handleChange} name = "user_name"  type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange = {handleChange} name = "password" type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </Card>
  );
}
