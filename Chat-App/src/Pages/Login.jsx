import { Form, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import "./Form.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const loginRoute = `/app/api/auth/login`;
  const nav = useNavigate();

  const [values, setValues] = useState({
    Username: "",
    Password: "",
  });

  const toastmsg = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { Password, Username } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          Username: Username,
          Password: Password,
        });
        console.log("Sent a request");
        console.table(data);
        if (data.status === 401) {
          toast.error("Erro r Logging in", toastmsg);
        }
        else{
          toast.success("Logged in", toastmsg);
          nav('/chat');
        }
      } catch (error) {
        if(error.response.status === 401){
            toast.error("Credentials are wrong, Please recheck", toastmsg)
        }
        if(error.response.status === 500){
            toast.error("Some Error Occured", toastmsg)
        }
      }
    }
  };

  const handleValidation = () => {
    const { Password, Username } = values;
    if (Password.length === "") {
      toast.error("Please Enter Password", toastmsg);
      return false;
    } else if (Username === "") {
      toast.error("Please Enter Username", toastmsg);
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
            type="password"
            placeholder="Password"
            name="Password"
            onChange={(e) => handleChange(e)}
          />

          <button onClick={handleSubmit}> Login </button>
          <span>
            Dont Have an Account? <Link to="/register">Sign Up</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
