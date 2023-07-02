import { Form, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import "./Form.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  
  const loginRoute = `/app/api/auth/login`;
  const registerRoute = `/app/api/auth/register`;
  const nav = useNavigate();

  const [values, setValues] = useState({
    Username: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    Name: "",
  });

  const toastmsg = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const Login = async () => {
    const { Password, Username } = values;
    const { data } = await axios.post(loginRoute, {
      Username: Username,
      Password: Password,
    });
    console.log("Sent a request");
    console.table(data);
    nav("/avatar");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { Password, Name, Username, Email } = values;
      const { data } = await axios.post(registerRoute, {
        Username,
        Email,
        Password,
        Name,
      });
      console.log("Sent a request");
      console.table(data);
      if (data.status === "false") {
        toast.error(data.message, toastmsg);
      } else if (data.status === "true") {
        toast.success(data.message, toastmsg);
        setTimeout(() => {
          Login();
        }, 2000);
      }
    }
  };

  const handleValidation = () => {
    const { Password, confirmPassword, Username, Email, Name } = values;
    if (Password !== confirmPassword) {
      toast.error("Password Not the Same as Confirm Password", toastmsg);
      return false;
    } else if (Username.length < 4) {
      toast.error(
        "Username too short (Should be more than 4 Letters)",
        toastmsg
      );
      return false;
    } else if (Password.length < 8) {
      toast.error(
        "Password too short (Should be more than 8 Letters)",
        toastmsg
      );
      return false;
    } else if (Email === "") {
      toast.error("Email cannot be Empty", toastmsg);
      return false;
    } else if (Name === "") {
      toast.error("Please Enter a Name", toastmsg);
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="FormContainer">
        <div className="brand">
          <img src={logo} />
        </div>
        <form>
          <input
            type="text"
            placeholder="Username"
            name="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Full Name"
            name="Name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Passowrd"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={handleSubmit}> Create User </button>
          <span>
            Already Have an Account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
