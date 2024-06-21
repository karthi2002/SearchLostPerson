import React from 'react';
import './UserDetailModal.css';
import defaultImg from './images/default.jpg';

const UserDetailModal = ({ complaint, onClose }) => {
  if (!complaint) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <img
            src={complaint.image ? `data:${complaint.image.contentType};base64,${complaint.image.data}` : defaultImg}
            width="240"
            height="270"
            alt="Complaint"
            className='mx-3 img-show'
          />
          <div className="modal-details my-1">
            <h4>Details: {complaint.details}</h4>
            <p  className='text-capitalize m-1'>Name: {complaint.name}</p>
            <p className='m-1'>Date of birth: {complaint.dob}</p>
            <p className='text-capitalize m-1'>Gender: {complaint.gender}</p>
            <p className='m-1'>Phone number: {complaint.phno}</p>
            <p className='m-1'>Email: {complaint.email}</p>
            <p className='m-1'>Data and Time Last Seen: {complaint.datalast}, {complaint.timelast}</p>
            <p  className='text-capitalize m-1'>Clothing Last Seen Wearing: {complaint.lastwearing}</p>
            <p  className='text-capitalize m-1'>Location Last Seen: {complaint.lastlocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
