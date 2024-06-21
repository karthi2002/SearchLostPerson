import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ setProfile }) => {
  const [Onbtn, setOnbtn] = useState(true);
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [signupName, setSignupName] = useState();
  const [signupEmail, setSignupEmail] = useState();
  const [signupPassword, setSignupPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/signupInsert",
        {
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }
      );
      alert(response.data);
      window.location.reload(false);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/loginProcess",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );
      localStorage.setItem("email", loginEmail);
      setProfile(true);
      alert(response.data);
      window.location.href = "/view";
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex Usercontent justify-content-center align-items-center vh-100">
      <div>
        <button
          className={`btn-2 px-4 py-2 mx-1 ${isLoginActive ? "active" : ""}`}
          onClick={() => {
            setOnbtn(true);
            setIsLoginActive(true);
          }}
        >
          Login
        </button>
        <button
          className={`btn-2 px-4 py-2 mx-1 ${!isLoginActive ? "active" : ""}`}
          onClick={() => {
            setOnbtn(false);
            setIsLoginActive(false);
          }}
        >
          Sign Up
        </button>
        {Onbtn ? (
          <div
            id="loginBorder"
            className="px-5"
            style={{ paddingTop: "25%", paddingBottom: "25%" }}
          >
            <h4 className="mb-5">Login</h4>
            <form onSubmit={handleSubmitLogin}>
              <input
                className="form-control my-2"
                onChange={(e) => setLoginEmail(e.target.value)}
                type="text"
                placeholder="Enter Email"
                required
              />
              <input
                className="form-control my-2"
                onChange={(e) => setLoginPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                required
              />
              <div className="d-flex justify-content-end">
                <a href="/forgot" className="btn fs-6">
                  Forgot Password?
                </a>
              </div>
              <button className="btn-1 p-2 mt-5">Login</button>
            </form>
          </div>
        ) : (
          <div id="signupBorder" className="p-5">
            <h4 className="mb-5">Sign Up</h4>
            <form onSubmit={handleSubmitSignup}>
              <input
                className="form-control my-2"
                onChange={(e) => setSignupName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                pattern="^[a-zA-Z]+"
                required
              />
              <input
                className="form-control my-2"
                type="text"
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="Enter your email"
                pattern="^[a-zA-Z0-9_.]+@gmail\.com"
                required
              />
              <input
                className="form-control my-2"
                type="password"
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Enter your password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$&@!_])[A-Za-z\d#$&@!_]{8,}$"
                required
              />
              <input
                className="form-control my-2"
                type="password"
                onChange={(e) => setconfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
              />
              <button className="btn-1 p-2 mt-5">Sign Up</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
