import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './View.css';
import { FcLike } from "react-icons/fc";
import { BiSolidUserDetail } from "react-icons/bi";
import { IoCallSharp } from "react-icons/io5";
import defaultImg from './images/default.jpg';
import UserDetailModal from './UserDetailModal';
import { AiOutlineUserDelete } from "react-icons/ai";

const View = ({ searchQuery }) => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/complaints')
      .then(response => {
        setComplaints(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the complaints!", error);
      });
  }, []);

  const handleUserDetailClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

  const handleDeleteComplaint = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3001/api/complaints/${id}`);
      if (response.status === 200) {
        setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint._id !== id));
        console.log('Complaint deleted successfully');
      } else {
        console.error('Failed to delete complaint', response);
      }
    } catch (error) {
      console.error('There was an error deleting the complaint!', error);
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='d-flex justify-content-center align-items-center viewContent my-3'>
      <div className="grid-image">
        {filteredComplaints.map((complaint, index) => (
          <div key={index} className="grid-image-item btn-6 p-2">
            {complaint.image ? (
              <img 
                src={`data:${complaint.image.contentType};base64,${complaint.image.data}`} 
                width='200' 
                height='200' 
                alt='Complaint' 
                onError={(e) => {
                  console.error("Error loading image:", e);
                  e.target.src = defaultImg; 
                }}
              />
            ) : (
              <img 
                src={defaultImg} 
                width='200' 
                height='200' 
                alt='Complaint' 
              />
            )}
            <p className='text-capitalize my-2'>{complaint.name}</p>
            <button className="btn-5 mx-2"><FcLike size={24} /></button>
            <button className="btn-5 mx-2" onClick={() => handleUserDetailClick(complaint)}><BiSolidUserDetail size={24}/></button>
            <a 
              className="btn-5 mx-2 calling" 
              href={`tel:${complaint.phno}`} 
              onClick={() => console.log(`Calling ${complaint.phno}`)}
              style={{color: 'black'}}
            >
              <IoCallSharp size={24} />
            </a>
            <button className="btn-5 mx-2" onClick={() => handleDeleteComplaint(complaint._id)}><AiOutlineUserDelete size={24}/></button>
          </div>
        ))}
      </div>
      {selectedComplaint && <UserDetailModal complaint={selectedComplaint} onClose={handleCloseModal} />}
    </div>
  );
};

export default View;
