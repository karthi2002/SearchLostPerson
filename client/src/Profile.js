import React, { useState, useEffect } from "react";
import Login from "./Login";
import axios from "axios";
import './Profile.css'

const Profile = () => {
  const [profile, setProfile] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setProfile(true);
      fetchProfileDetails(email);
    }
  }, []);

  const fetchProfileDetails = (email) => {
    axios.get('http://localhost:3001/api/profile', {
      params: { email }
      })
    .then(response => {
        const { totalRecords, complaints } = response.data;
        setProfileDetails({ totalRecords, complaints });
      })
    .catch(error => {
      console.error("There was an error fetching the complaints!", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    setProfile(false);
  };

  return (
    <div>
      {profile ? (
        <div className="d-flex flex-direction-row justify-content-center align-items-center vh-100">
          <div className="d-flex flex-direction-column">
            <h3 id="head" className="p-2">LOST PERSON</h3>
            <div id='comp'>
              <h5>Complaints</h5>
              <p>Total number of Complaints: {profileDetails.totalRecords}</p>
              <p>Number of Complaints raised by you: {profileDetails.complaints}</p>
            </div>
          </div>
          <button className="btn-4 p-2 mt-3" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Login setProfile={setProfile} />
        </div>
      )}
    </div>
  );
};

export default Profile;
