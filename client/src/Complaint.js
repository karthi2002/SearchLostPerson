import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "./Complaint.css";
import axios from "axios";

const Complaint = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phno, setPhno] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [datalast, setDatalast] = useState("");
  const [timelast, setTimelast] = useState("");
  const [lastwearing, setLastWearing] = useState("");
  const [lastlocation, setLastlocation] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    if (!email) {
      navigate("/user")
    }
  }, [email, navigate]);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("phno", phno);
    formData.append("email", email);
    formData.append("datalast", datalast);
    formData.append("timelast", timelast);
    formData.append("lastwearing", lastwearing);
    formData.append("lastlocation", lastlocation);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/Complaint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  if (!email) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="px-5 py-2" id="complaintBorder">
          <h4 className="mb-3">Please log in to submit a complaint</h4>
          <button onClick={() => navigate("/login")} className="btn-4 p-2 mt-3">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex ComplaintContent justify-content-center align-items-center vh-100">
      <div className="px-5 py-2" id="complaintBorder">
        <h4 className="mb-3">Complaint</h4>
        <form onSubmit={handleSubmitPost}>
          <div className="row">
            <div className="col-md-6 col-12 mb-3">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Date of Birth</label>
              <input
                className="form-control w-50"
                type="date"
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Age</label>
              <input
                className="form-control"
                type="text"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Gender</label>
              <select className="form-control" onChange={(e) => setGender(e.target.value)} required>
                <option>--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Phone number</label>
              <input
                className="form-control"
                type="text"
                placeholder="eg: +91 8899223344"
                pattern="^\+?[1-9]\d{1,14}$"
                onChange={(e) => setPhno(e.target.value)}
                required
              ></input>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Email address</label>
              <input
                className="form-control"
                type="text"
                value={email}
                placeholder="Email address"
                readOnly
              ></input>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Date and Time Last Seen</label>
              <div className="d-flex">
                <input
                  className="form-control w-50"
                  type="date"
                  onChange={(e) => setDatalast(e.target.value)}
                  required
                ></input>
                <input
                  className="form-control w-50"
                  type="time"
                  onChange={(e) => setTimelast(e.target.value)}
                  required
                ></input>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Clothing Last Seen Wearing</label>
              <input
                className="form-control"
                type="text"
                placeholder="Clothing Last Seen Wearing"
                onChange={(e) => setLastWearing(e.target.value)}
                required
              ></input>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Location Last Seen</label>
              <input
                className="form-control"
                type="text"
                placeholder="Location Last Seen"
                onChange={(e) => setLastlocation(e.target.value)}
                required
              ></input>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>Photograph</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <small className="text-muted">upload a recent photography</small>
            </div>
          </div>
          <button className="btn-4 p-2 mt-3">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
